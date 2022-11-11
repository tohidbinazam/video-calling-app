import express from 'express'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io';
import mongoDBConnect from './config/db.js';
import userRouter from './routers/userRouter.js'
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import verifyToken from './controllers/verifyToken.js';
import { allUpdatedUser } from './controllers/userController.js';

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

    socket.on('me', (user) => {
        allUpdatedUser(user, socket.id)
    })

    socket.on('users', (data) => {
         io.emit('users', data)
    })
    

    socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

    socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})

    socket.on("disconnect", () => {
		console.log(`Socket clint Disconnect ID ${socket.id}`);
	})
})

// User router
app.use('/api/v1/user', userRouter)

// Token verify
app.post('/api/v1/verify-token', verifyToken)

// Express error handler
app.use(errorHandler)

server.listen(port, () => {
    mongoDBConnect()
    console.log(`SERVER RUNNING ON PORT: ${port}`);
})