const express = require("express")
const router = express.Router()

const userTasksModel = require('../models/userTasks')

router.get("/pending-tasks", async (req, res) => {
    try {
        const userID = req.query.userID
        const pendingTs = await userTasksModel.find({ userID, taskStatus: "pending" }).sort({ createdAt: -1 })

        return res.status(200).json({ message: "Tasks fetched successfully!", pendingTs })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/completed-tasks", async (req, res) => {
    try {
        const userID = req.query.userID
        const completedTs = await userTasksModel.find({ userID, taskStatus: "completed" }).sort({ createdAt: -1 })

        return res.status(200).json({ message: "Tasks fetched successfully!", completedTs })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/failed-tasks", async (req, res) => {
    try {
        const userID = req.query.userID
        const failedTs = await userTasksModel.find({ userID, taskStatus: "rejected" }).sort({ updatedAt: -1 })

        return res.status(200).json({ message: "Tasks fetched successfully!", failedTs })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router