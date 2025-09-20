import "express-async-errors"
import express, { Request, Response, NextFunction } from "express"
import { createServer } from "http"
import { Server, Socket } from "socket.io"
import { PrismaClient } from "@prisma/client"
import AppError from "./error"
import socketEvents from "./socket.events"
import usersRouter from "./routes/users.routes"
import authRouter from "./routes/auth.routes"
import * as middlewares from "./middlewares"

export const prisma = new PrismaClient()

const app = express()

const httpServer = createServer(app)

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
})

app.use(express.json())

/*
 *socket
 * */
io.use(middlewares.authSocketMiddleware)
io.on("connection", (socket: Socket) => {
  socketEvents(socket)
})

/*
 *routes
 * */
app.get("/rooms/:room/users", (req, res) => {
  const room = req.params.room

  // Obter os sockets da sala
  const roomSockets = Array.from(io.sockets.adapter.rooms.get(room) || [])

  res.json({
    room,
    users: roomSockets,
  })
})
app.get("/ping", (_, res) => res.send("<h1>pong</h1>"))
app.use("/auth", authRouter)
app.use("/users", usersRouter)

app.use(
  (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message })
    }

    console.log(err)

    return res.status(500).json({ message: "Internal server error." })
  }
)

export default httpServer
