const express = require("express")
const router = express.Router()

const userTasksModel = require('../../models/userTasks')
const submittedTasksModel = require('../../models/submittedTasks')
const notificationsModel = require('../../models/notifications')

router.get("/submit-task/:taskID", async (req, res) => {
    try {
        const { taskID } = req.params
        const taskDetails = await userTasksModel.findOne({ taskID })

        return res.status(200).json({ message: "Task fetched successfully!", taskDetails })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/submit-task", async (req, res) => {
    try {
        const { taskToSubmit, notification } = req.body
        const taskID = taskToSubmit.taskID

        const isTaskSubmitted = await submittedTasksModel.findOne({ taskID })
        if (isTaskSubmitted) {
            return res.status(401).json({ message: "Task already submitted!" })
        }

        await Promise.all([
            submittedTasksModel.create(taskToSubmit),
            notificationsModel.create(notification)
        ])

        return res.status(201).json({ message: "Task submitted to admin!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router