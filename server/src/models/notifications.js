const mongoose = require("mongoose")
const { Schema } = mongoose

const notificationsSchema = new Schema({
    recipient: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String }
}, { timestamps: true })

const notificationsModel = mongoose.models.notifications || mongoose.model("notifications", notificationsSchema)

module.exports = notificationsModel