const express = require("express")
const router = express.Router()

const userTasksModel = require('../models/userTasks')
const publicTasksModel = require('../models/publicTasks')

router.get("/dashboard", async (req, res) => {
    try {
        const userID = req.query.userID

        const userTCount = await userTasksModel.countDocuments({ userID })
        const completedTCount = await userTasksModel.countDocuments({ userID, taskStatus: "completed" })
        const pendingTCount = await userTasksModel.countDocuments({ userID, taskStatus: "pending" })
        const failedTCount = await userTasksModel.countDocuments({ userID, taskStatus: "rejected" })
        const publicTCount = await publicTasksModel.countDocuments()

        return res.status(200).json({ message: "Your tasks fetched successfully!", userTCount, completedTCount, pendingTCount, failedTCount, publicTCount })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router