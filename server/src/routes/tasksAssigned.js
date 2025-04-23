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

module.exports = router