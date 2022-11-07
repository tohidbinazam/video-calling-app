import express from 'express'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io';
import mongoDBConnect from './config/db.js';
import userRouter from './routers/userRouter.js'
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';


dotenv.config()
const port = process.env.PORT || 5080

// Express init
const app = express()

// Body init
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

// cookie parser init
app.use(cookieParser())

const server = createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {

    console.log(`Socket clint connect successfully ID ${socket.id}`);

    socket.on('send_message', (room, chat) => {
        console.log('ok');
    })

    socket.on("disconnect", () => {
		console.log(`Socket clint Disconnect ID ${socket.id}`);
	})
})

// User router
app.use('/api/v1/user', userRouter)

// Express error handler
app.use(errorHandler)

server.listen(port, () => {
    mongoDBConnect()
    console.log(`SERVER RUNNING ON PORT: ${port}`);
})