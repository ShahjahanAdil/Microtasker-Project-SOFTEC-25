const mongoose = require("mongoose")
const { Schema } = mongoose

const userTasksSchema = new Schema({
    userID: { type: String, required: true },
    userEmail: { type: String, required: true },
    adminID: { type: String, required: true },
    adminEmail: { type: String, required: true },
    adminName: { type: String, required: true },
    taskID: { type: String, required: true },
    taskTitle: { type: String, required: true },
    taskDescription: { type: String, required: true },
    taskPrice: { type: Number, required: true },
    taskPoints: { type: Number, required: true },
    taskStatus: { type: String },
    taskMode: { type: String }
}, { timestamps: true })

const userTasksModel = mongoose.models.usertasks || mongoose.model("usertasks", userTasksSchema)

module.exports = userTasksModel