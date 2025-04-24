const express = require("express")
const router = express.Router()

const userTasksModel = require('../../models/userTasks')

router.get("/your-tasks", async (req, res) => {
    try {
        const userID = req.query.userID
        const page = parseInt(req.query.page) || 1
        const limit = 10
        const skip = (page - 1) * limit

        const yourTasks = await userTasksModel.find({ userID }).sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalTasks = await userTasksModel.countDocuments({ userID })

        return res.status(200).json({ message: "Tasks fetched successfully!", yourTasks, totalTasks })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.delete("/your-tasks/delete", async (req, res) => {
    try {
        const userID = req.query.userID
        const taskID = req.query.taskID

        await userTasksModel.findOneAndDelete({ userID, taskID })

        return res.status(203).json({ message: "Task deleted successfully!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router