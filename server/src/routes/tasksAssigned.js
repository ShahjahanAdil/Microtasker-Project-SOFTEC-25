const express = require("express")
const router = express.Router()

const userTasksModel = require('../models/userTasks')

router.get("/tasks-assigned", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 20
        const skip = (page - 1) * limit

        const assignedTs = await userTasksModel.find({ taskMode: "private" }).sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalAssignedTasks = await userTasksModel.countDocuments({ taskMode: "private" })

        return res.status(200).json({ message: "Tasks fetched successfully!", assignedTs, totalAssignedTasks })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.patch("/tasks-assigned/update", async (req, res) => {
    try {
        const { taskID, taskTitle, taskDescription, taskPoints, taskPrice } = req.body;

        if (!taskID || !taskTitle || !taskDescription || !taskPoints || !taskPrice) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        await userTasksModel.findOneAndUpdate({ taskID }, { taskTitle, taskDescription, taskPoints, taskPrice }, { new: true })

        return res.status(202).json({ message: "Task updated successfully!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.delete("/tasks-assigned/delete", async (req, res) => {
    try {
        const taskID = req.query.taskID

        await userTasksModel.findOneAndDelete({ taskID })

        return res.status(203).json({ message: "Task deleted successfully!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router