const express = require("express")
const router = express.Router()

const authModel = require('../models/auth')
const userTasksModel = require('../models/userTasks')
const notificationsModel = require('../models/notifications')

router.get("/assign-task/:userID", async (req, res) => {
    try {
        const { userID } = req.params

        const user = await authModel.findOne({ userID })
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        return res.status(200).json({ message: "User fetched successfully!", user })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/assign-task", async (req, res) => {
    try {
        const { privateTask, notification } = req.body

        await Promise.all([
            userTasksModel.create(privateTask),
            notificationsModel.create(notification)
        ])

        return res.status(201).json({ message: "Task assigned successfully to user!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router