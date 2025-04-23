const express = require("express")
const router = express.Router()

const publicTasksModel = require('../../models/publicTasks')
const userTasksModel = require('../../models/userTasks')

router.get("/public-tasks", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 15
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

router.get("/public-tasks/taskID/:taskID", async (req, res) => {
    try {
        const { taskID } = req.params
        const taskDetails = await publicTasksModel.findOne({ taskID })

        if (!taskDetails) {
            return res.status(401).json({ message: "No such task exists!" })
        }

        return res.status(200).json({ message: "Task fetched successfully!", taskDetails })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/public-tasks/get-task", async (req, res) => {
    try {
        const acceptedTask = req.body

        const isTaskAddedAlready = await userTasksModel.findOne({ taskID: acceptedTask.taskID, userID: acceptedTask.userID })
        if (isTaskAddedAlready) {
            return res.status(400).json({ message: "Task is already present in your task list!" })
        }

        await userTasksModel.create(acceptedTask)

        return res.status(201).json({ message: "Task added to your account successfully!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router