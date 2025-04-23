const express = require("express")
const router = express.Router()

const paymentsModel = require('../models/payments')
const withdrawsModel = require('../models/withdraws')
const notificationsModel = require("../models/notifications")

router.get("/payments", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 15
        const skip = (page - 1) * limit

        const totalUserWithdraws = await withdrawsModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalWithdraws = await withdrawsModel.countDocuments()

        return res.status(200).json({ message: "Withdraws fetched successfully!", totalUserWithdraws, totalWithdraws })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.patch("/payments/accept", async (req, res) => {
    try {
        const withdrawID = req.query.withdrawID
        const userID = req.query.userID
        const withdrawAmount = parseFloat(req.query.withdrawAmount)

        const userPaymentDets = await paymentsModel.findOne({ userID })
        if (!userPaymentDets) {
            return res.status(404).json({ message: "Something went wrong. Please try again!" })
        }

        const withdrawDets = await withdrawsModel.findOne({ withdrawID })
        if (withdrawDets.withdrawStatus === "completed") {
            return res.status(400).json({ message: "Withdraw request already completed!" })
        }

        if (userPaymentDets.pendingAmount < withdrawAmount) {
            return res.status(400).json({ message: "Insufficient pending amount!" })
        }

        await Promise.all([
            paymentsModel.findOneAndUpdate(
                { userID, pendingAmount: { $gte: withdrawAmount } },
                {
                    $inc: {
                        pendingAmount: -withdrawAmount,
                        totalWithdrawal: withdrawAmount
                    }
                },
                { new: true }
            ),
            withdrawsModel.findOneAndUpdate({ withdrawID }, { withdrawStatus: "completed" }, { new: true })
        ])

        await notificationsModel.create({
            recipient: userID,
            content: `✅ Your withdrawal request (ID: ${withdrawID}) for $${withdrawAmount} has been accepted.`,
            status: "unread"
        });

        return res.status(202).json({ message: "Withdrawal request completed!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.patch("/payments/reject", async (req, res) => {
    try {
        const withdrawID = req.query.withdrawID
        const userID = req.query.userID
        const withdrawAmount = parseFloat(req.query.withdrawAmount)

        const userPaymentDets = await paymentsModel.findOne({ userID })
        if (!userPaymentDets) {
            return res.status(404).json({ message: "Something went wrong. Please try again!" })
        }

        const withdrawDets = await withdrawsModel.findOne({ withdrawID })
        if (withdrawDets.withdrawStatus === "cancelled") {
            return res.status(400).json({ message: "Withdraw request already rejected!" })
        }

        await Promise.all([
            paymentsModel.findOneAndUpdate(
                { userID, pendingAmount: { $gte: withdrawAmount } },
                {
                    $inc: { pendingAmount: -withdrawAmount, }
                },
                { new: true }
            ),
            withdrawsModel.findOneAndUpdate({ withdrawID }, { withdrawStatus: "cancelled" }, { new: true })
        ])

        await notificationsModel.create({
            recipient: userID,
            content: `❌ Your withdraw request (ID: ${withdrawID}) has been rejected.`,
            status: "unread"
        });

        return res.status(202).json({ message: "Withdraw request rejected!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router