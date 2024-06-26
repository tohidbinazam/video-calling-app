import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoDBConnect from './config/db.js';
import userRouter from './routers/userRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import verifyToken from './controllers/verifyToken.js';
import {
  allUpdatedUser,
  disUpdatedUser,
} from './controllers/userController.js';
import path from 'path';

dotenv.config();
mongoDBConnect();

const __dirname = path.resolve();

const port = process.env.PORT || 5080;

// Express init
const app = express();

// Body init
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('server/public'));

// cookie parser init
app.use(cookieParser());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Socket clint connect successfully ID ${socket.id}`);

  socket.on('me', (user) => {
    allUpdatedUser(user, socket.id);
  });

  socket.on('users', (data) => {
    io.emit('users', data);
  });

  socket.on('callUser', (data) => {
    io.to(data.userToCall).emit('callUser', {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal, data.name);
  });
  socket.on('callEnd', (data) => {
    io.to(data).emit('callEnd', null);
  });

  socket.on('disconnect', () => {
    disUpdatedUser(socket.id);
    console.log(`Socket clint Disconnect ID ${socket.id}`);
  });
});

// User router
app.use('/api/v1/user', userRouter);

// Token verify
app.post('/api/v1/verify-token', verifyToken);

// Express error handler
app.use(errorHandler);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  );
}

server.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT: ${port}`);
});
