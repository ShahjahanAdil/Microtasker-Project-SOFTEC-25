const express = require("express")
const router = express.Router()

const publicTasksModel = require('../../models/publicTasks')
const userTasksModel = require('../../models/userTasks')

router.get("/public-tasks", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 15;
        const skip = (page - 1) * limit;
        const search = req.query.search || "";
        const sortBy = req.query.sortBy || "";

        const searchFilter = search
            ? {
                $or: [
                    { taskTitle: { $regex: search, $options: "i" } },
                    { taskDescription: { $regex: search, $options: "i" } },
                ]
            }
            : {};

        let sortQuery = { createdAt: -1 };

        if (sortBy === "price-asc") sortQuery = { taskPrice: 1 };
        else if (sortBy === "price-desc") sortQuery = { taskPrice: -1 };
        else if (sortBy === "points-asc") sortQuery = { taskPoints: 1 };
        else if (sortBy === "points-desc") sortQuery = { taskPoints: -1 };

        const publicTasks = await publicTasksModel
            .find(searchFilter)
            .sort(sortQuery)
            .skip(skip)
            .limit(limit);

        const totalPublicTasks = await publicTasksModel.countDocuments(searchFilter);

        if (publicTasks.length === 0) {
            return res.status(404).json({ message: "No matching tasks found!" });
        }

        return res.status(200).json({
            message: "Tasks fetched successfully!",
            publicTasks,
            totalPublicTasks
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
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