const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const authModel = require('../models/auth')
const paymentsModel = require('../models/payments')

const verfiyToken = require('../middleware/auth')

router.post("/signup", async (req, res) => {
    try {
        const newUserData = req.body
        const { userID, email, password } = newUserData

        const userFound = await authModel.findOne({ email })
        if (userFound) {
            return res.status(403).json({ message: "User already exists!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = { ...newUserData, password: hashedPassword }
        await Promise.all([
            authModel.create(user),
            paymentsModel.create({
                userID,
                availableBalance: 0,
                pendingAmount: 0,
                totalWithdrawal: 0
            })
        ])

        res.status(201).json({ message: "User registered succesfully!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await authModel.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const matchedPassword = await bcrypt.compare(password, user.password)

        if (matchedPassword) {
            const { userID } = user
            const token = jwt.sign({ userID }, "secret-key", { expiresIn: '3d' })

            res.status(200).json({ message: "Login Successful!", token, user })
        } else {
            return res.status(401).json({ message: "Invalid email or password" })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/user", verfiyToken, async (req, res) => {
    try {
        const userID = req.userID
        const user = await authModel.findOne({ userID })

        if (!user) {
            return res.status(404).json({ message: "User not found!" })
        }

        res.status(200).json({ user })
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: error.message })
    }
})

module.exports = router