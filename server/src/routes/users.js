const express = require("express")
const router = express.Router()

const authModel = require('../models/auth')

router.get("/fetch-users", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 20
        const skip = (page - 1) * limit

        const users = await authModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalUsers = await authModel.countDocuments()

        return res.status(200).json({ message: "Users fetched successfully!", users, totalUsers })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/fetch-users/:searchEmail", async (req, res) => {
    try {
        const { searchEmail } = req.params
        const user = await authModel.findOne({ email: searchEmail })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.status(200).json({ message: "User fetched successfully!", user })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router