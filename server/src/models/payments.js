const mongoose = require("mongoose")
const { Schema } = mongoose

const paymentsSchema = new Schema({
    userID: { type: String, required: true, unique: true },
    availableBalance: { type: Number },
    pendingAmount: { type: Number },
    totalWithdrawal: { type: Number }
}, { timestamps: true })

const paymentsModel = mongoose.models.payments || mongoose.model("payments", paymentsSchema)

module.exports = paymentsModel