const express = require("express")
const router = express.Router()

const authModel = require('../models/auth')
const submittedTasksModel = require('../models/submittedTasks')
const userTasksModel = require('../models/userTasks')
const paymentsModel = require('../models/payments')
const notificationsModel = require('../models/notifications')

router.get("/submitted-tasks", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 20
        const skip = (page - 1) * limit

        const submittedTasks = await submittedTasksModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalSubmittedTasks = await submittedTasksModel.countDocuments()

        return res.status(200).json({ message: "Tasks fetched successfully!", submittedTasks, totalSubmittedTasks })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/submitted-tasks/:taskID", async (req, res) => {
    try {
        const { taskID } = req.params

        const submittedTask = await submittedTasksModel.findOne({ taskID })
        if (!submittedTask) {
            return res.status(404).json({ message: "Task not found" })
        }

        return res.status(200).json({ message: "Task fetched successfully!", submittedTask })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.patch("/submitted-tasks/accept", async (req, res) => {
    try {
        const taskID = req.query.taskID
        const userID = req.query.userID
        const updatedTask = req.body

        const task = await submittedTasksModel.findOne({ taskID })
        if (task.taskStatus === "completed") {
            return res.status(401).json({ message: "Task is already accepted" })
        }

        const userPaymentDets = await paymentsModel.findOne({ userID })
        if (!userPaymentDets) {
            return NextResponse.json({ message: "Something went wrong. Please try again!" }, { status: 401 })
        }

        const taskPriceFloat = parseFloat(updatedTask.taskPrice);
        const taskPointsFloat = parseFloat(updatedTask.taskPoints);

        const updateResults = await Promise.all([
            authModel.findOneAndUpdate({ userID }, { $inc: { points: taskPointsFloat } }, { new: true }),
            paymentsModel.findOneAndUpdate({ userID }, { $inc: { availableBalance: taskPriceFloat } }, { new: true }),
            submittedTasksModel.findOneAndUpdate({ taskID }, { taskStatus: "completed" }, { new: true }),
            userTasksModel.findOneAndUpdate({ taskID }, { taskStatus: "completed" }, { new: true })
        ])

        if (updateResults.includes(null)) {
            return res.status(500).json({ message: "Failed to update some records" })
        }

        await notificationsModel.create({
            recipient: userID,
            content: `🎉 Your task (ID: ${taskID}) has been accepted! You earned ${taskPointsFloat} points.`,
            status: "unread"
        });

        return res.status(202).json({ message: "Task accepted!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.patch("/submitted-tasks/reject", async (req, res) => {
    try {
        const taskID = req.query.taskID

        const task = await submittedTasksModel.findOne({ taskID })

        if (task.taskStatus === "rejected") {
            return res.status(401).json({ message: "Task is already rejected" })
        }

        await Promise.all([
            submittedTasksModel.findOneAndUpdate({ taskID }, { taskStatus: "rejected" }, { new: true }),
            userTasksModel.findOneAndUpdate({ taskID }, { taskStatus: "rejected" }, { new: true })
        ])

        await notificationsModel.create({
            recipient: task.userID,
            content: `❌ Your task (ID: ${taskID}) has been rejected!`,
            status: "unread"
        });

        return res.status(202).json({ message: "Task rejected!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router