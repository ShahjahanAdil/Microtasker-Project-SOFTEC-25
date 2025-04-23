const express = require("express")
const router = express.Router()

const publicTasksModel = require('../models/publicTasks')

router.get("/tasks-created", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 20
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

module.exports = router