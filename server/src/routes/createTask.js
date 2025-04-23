const express = require("express")
const router = express.Router()

const publicTasksModel = require('../models/publicTasks')

router.post("/create-task", async (req, res) => {
    try {
        const newTask = req.body
        await publicTasksModel.create(newTask)

        return res.status(201).json({ message: "Task created successfully!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router