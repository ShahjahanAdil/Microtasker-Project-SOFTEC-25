const express = require("express")
const router = express.Router()

const paymentsModel = require('../models/payments')
const withdrawsModel = require("../models/withdraws")

router.get("/payments", async (req, res) => {
    try {
        const userID = req.query.userID
        const userAccountDets = await paymentsModel.findOne({ userID })

        return res.status(200).json({ message: "Your account fetched successfully!", userAccountDets })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/payments/withdraws", async (req, res) => {
    try {
        const userID = req.query.userID
        const page = parseInt(req.query.page) || 1
        const limit = 10
        const skip = (page - 1) * limit

        const userWithdraws = await withdrawsModel.find({ userID }).sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalWithdraws = await withdrawsModel.countDocuments({ userID })

        return res.status(200).json({ message: "Withdraws fetched successfully!", userWithdraws, totalWithdraws })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/payments", async (req, res) => {
    try {
        const newWithdraw = req.body

        const userAccountDets = await paymentsModel.findOne({ userID: newWithdraw.userID })
        if (!userAccountDets) {
            return res.status(404).json({ message: "Something went wrong. Please try again!" })
        }

        const updateResults = await Promise.all([
            paymentsModel.findOneAndUpdate(
                { userID: newWithdraw.userID },
                {
                    availableBalance: 0,
                    $inc: { pendingAmount: newWithdraw.withdrawAmount }
                },
                { new: true }
            ),
            withdrawsModel.create(newWithdraw)
        ])

        if (updateResults.includes(null)) {
            return res.status(500).json({ message: "Failed to update some records" })
        }

        return res.status(201).json({ message: "Withdraw request generated successfully!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/payments/payouts", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 20
        const skip = (page - 1) * limit

        const payouts = await withdrawsModel.find({ withdrawStatus: "completed" }).sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalPayouts = await withdrawsModel.countDocuments()

        return res.status(200).json({ message: "Payouts fetched successfully!", payouts, totalPayouts })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router