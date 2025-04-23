const mongoose = require("mongoose")
const { Schema } = mongoose

const submittedTasksSchema = new Schema({
    userID: { type: String, required: true },
    userEmail: { type: String, required: true },
    adminID: { type: String, required: true },
    adminEmail: { type: String, required: true },
    adminName: { type: String, required: true },
    taskID: { type: String, required: true, unique: true },
    taskTitle: { type: String, required: true },
    taskDescription: { type: String, required: true },
    taskPrice: { type: Number, required: true },
    taskPoints: { type: Number, required: true },
    taskStatus: { type: String },
    taskMode: { type: String },
    domainLink: { type: String },
    githubLink: { type: String },
    extraLink: { type: String }
}, { timestamps: true })

const submittedTasksModel = mongoose.models.submittedTasks || mongoose.model("submittedTasks", submittedTasksSchema)

module.exports = submittedTasksModel