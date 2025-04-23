const mongoose = require("mongoose")
const { Schema } = mongoose

const publicTasksSchema = new Schema({
    adminID: { type: String, required: true },
    adminName: { type: String, required: true },
    adminEmail: { type: String, required: true },
    taskID: { type: String, required: true, unique: true },
    taskTitle: { type: String, required: true },
    taskDescription: { type: String, required: true },
    taskPrice: { type: Number, required: true },
    taskPoints: { type: Number, required: true },
    taskStatus: { type: String },
    taskMode: { type: String }
}, { timestamps: true })

const publicTasksModel = mongoose.models.publictasks || mongoose.model("publictasks", publicTasksSchema)

module.exports = publicTasksModel