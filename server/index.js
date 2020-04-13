const express = require('express')
const app = express()
const server = require('http').createServer(app)
const socketio = require('socket.io')
const io = socketio(server)
const moment = require('moment')
const cors = require('cors')
const PORT = process.env.PORT || 8080
const router = require('./router')
const {
    addUser,
    getUser,
    deleteUser,
    getRoomUsers
} = require('./utils/users')
const formatMessage = require('./utils/messages')
const bot = 'ChatBot'

app.use(router)
app.use(cors)


io.on('connection', socket => {

    socket.on('join-room', ({ user, room }, cb) => {

        const { error, newUser } = addUser(socket.id, user, room)

        if (error) {
            return cb(error)
        } else {
            socket.join(newUser.room)
            io.to(newUser.room).emit('roomUsers', {
                room: newUser.room,
                users: getRoomUsers(newUser.room)
            })
            socket.emit('chat-message', formatMessage(bot, `Hello, ${newUser.name}! Welcome to room ${newUser.room}!`))
            socket.broadcast.to(newUser.room)
                .emit('newUser', formatMessage(bot, `User ${newUser.name} has joined the room ${newUser.room}`))
        }
    })

    socket.on('chat-message', msg => {
        const user = getUser(socket.id)
        io.to(user.room).emit('chat-message', formatMessage(user.name, msg))
    })

    socket.on('disconnect', () => {

        const user = deleteUser(socket.id)

        if (user) {
            io.to(user.room)
                .emit('chat-message', formatMessage(bot, `User ${user.name} has left the room ${user.room}`))
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
    })
})

server.listen(PORT, () => console.log(`Server is running at port: ${PORT}`))