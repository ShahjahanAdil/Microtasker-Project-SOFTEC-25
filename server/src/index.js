const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { config } = require("dotenv")

const app = express()
app.use(express.json())
app.use(cors())
config()

mongoose.connect(process.env.MONGODBURI, { dbName: "microtasker" })
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch((err) => {
        console.error(err)
    })

const { PORT = 8000 } = process.env

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})

const authRouter = require('./routes/auth')
const createTaskRouter = require('./routes/createTask')
const publicTasksRouter = require('./routes/publicTasks/publicTasks')
const yourTasksRouter = require('./routes/yourTasks/yourTasks')
const submitTaskRouter = require('./routes/yourTasks/submitTask')
const tasksRouter = require('./routes/tasks')
const tasksCreatedRouter = require('./routes/tasksCreated')
const usersRouter = require('./routes/users')
const assignTaskRouter = require('./routes/assignTask')
const tasksAssignedRouter = require('./routes/tasksAssigned')
const submittedTasksRouter = require('./routes/submittedTasks')
const notificationsRouter = require('./routes/notifications')

app.use('/auth', authRouter)
app.use('/admin', createTaskRouter)
app.use('/admin', tasksCreatedRouter)
app.use('/admin', usersRouter)
app.use('/admin', assignTaskRouter)
app.use('/admin', tasksAssignedRouter)
app.use('/admin', submittedTasksRouter)
app.use('/admin', notificationsRouter)
app.use('/user', publicTasksRouter)
app.use('/user', yourTasksRouter)
app.use('/user', submitTaskRouter)
app.use('/user', tasksRouter)
app.use('/user', notificationsRouter)