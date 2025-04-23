const express = require("express")
const router = express.Router()

const authModel = require("../models/auth")

router.patch("/profile/update-account", async (req, res) => {
    try {
        const profileUser = req.body
        const userID = req.query.userID

        await authModel.findOneAndUpdate({ userID }, profileUser, { new: true })

        return res.status(202).json({ message: "User updated!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.delete("/profile/delete-account", async (req, res) => {
    try {
        const userID = req.query.userID

        await authModel.findOneAndDelete({ userID })

        return res.status(203).json({ message: "User Deleted!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router