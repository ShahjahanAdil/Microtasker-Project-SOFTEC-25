const mongoose = require("mongoose")
const { Schema } = mongoose

const withdrawsSchema = new Schema({
    withdrawID: { type: String, required: true },
    userID: { type: String, required: true },
    userEmail: { type: String, required: true },
    withdrawStatus: { type: String },
    withdrawAmount: { type: Number },
    withdrawalAccount: { type: String, required: true },
    withdrawalAccountNumber: { type: String, required: true },
}, { timestamps: true })

const withdrawsModel = mongoose.models.withdraws || mongoose.model("withdraws", withdrawsSchema)

module.exports = withdrawsModel