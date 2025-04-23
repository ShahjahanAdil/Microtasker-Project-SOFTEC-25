const express = require("express")
const router = express.Router()

const notificationsModel = require('../models/notifications')

router.get("/notifications", async (req, res) => {
    try {
        const userID = req.query.userID
        const page = parseInt(req.query.page) || 1
        const limit = 15
        const skip = (page - 1) * limit

        const userNotifications = await notificationsModel.find({ recipient: userID }).sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalNotifications = await notificationsModel.countDocuments({ recipient: userID })

        return res.status(200).json({ message: "Notifications fetched successfully", userNotifications, totalNotifications })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.delete("/notifications/clear-all", async (req, res) => {
    try {
        const userID = req.query.userID
        await notificationsModel.deleteMany({ recipient: userID })

        return res.status(203).json({ message: "Notifications cleared successfully" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/notifications/header-notifications", async (req, res) => {
    try {
        const userID = req.query.userID
        const userLimitedNotifications = await notificationsModel.find({ recipient: userID }).sort({ createdAt: -1 }).limit(3)

        return res.status(200).json({ message: "Notifications fetched successfully", userLimitedNotifications })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.patch("/notifications/mark-as-read", async (req, res) => {
    try {
        const { userID } = req.body
        await notificationsModel.updateMany({ recipient: userID, status: "unread" }, { status: "read" })

        return res.status(202).json({ message: "Notifications marked as read successfully!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router