const express = require("express")
const router = express.Router()

const publicTasksModel = require('../models/publicTasks')

router.get("/tasks-created", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 20
        const skip = (page - 1) * limit

        const publicTasks = await publicTasksModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalPublicTasks = await publicTasksModel.countDocuments()

        return res.status(200).json({ message: "Tasks fetched successfully!", publicTasks, totalPublicTasks })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.patch("/tasks-created/update", async (req, res) => {
    try {
        const { taskID, taskTitle, taskDescription, taskPoints, taskPrice } = req.body;

        if (!taskID || !taskTitle || !taskDescription || !taskPoints || !taskPrice) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        await publicTasksModel.findOneAndUpdate({ taskID }, { taskTitle, taskDescription, taskPoints, taskPrice }, { new: true })

        return res.status(202).json({ message: "Task updated successfully!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.delete("/tasks-created/delete", async (req, res) => {
    try {
        const taskID = req.query.taskID

        await publicTasksModel.findOneAndDelete({ taskID })

        return res.status(203).json({ message: "Task deleted successfully!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router