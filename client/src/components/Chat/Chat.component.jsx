import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import ChatUsers from './ChatComponents/ChatUsers/ChatUsers'
import MessageInput from './ChatComponents/MessageInput/MessageInput'
import ChatMessages from './ChatComponents/ChatMessages/ChatMessages'

// initialize socket connection with server http://localhost:8080/
const ENDPOINT = 'http://localhost:8080/'
let socket = io(ENDPOINT)

export default function Chat({ location }) {

    // set Hooks for message and room handling
    const [user, setUser] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [roomUsers, setRoomUsers] = useState([])

    const sendMessage = (e, msg) => {
        if (!msg || msg === '') {
            return
        }
        else if (e.key === 'Enter') {
            socket.emit('chat-message', message)
            setMessage('')
            e.preventDefault()
        }
    }

    const sendMessageBtn = (e, msg) => {
        if (!msg || msg === '') {
            return
        }
        else {
            socket.emit('chat-message', message)
            setMessage('')
            e.preventDefault()
        }
    }

    useEffect(() => {

        //getting user and room data
        const { room, user } = queryString.parse(location.search)
        setUser(user)
        setRoom(room)

        // send user and room data to the server 
        socket.emit('join-room', { user, room }, (error) => {
            if (error) {
                alert(error);
            }
        })

        //receive msg from server that new User was added to room and add Invitation msg
        socket.on('newUser', (msg) => {
            setMessages((messages => [...messages, msg]))
        })

        //get data about active users in the room and set using hooks
        socket.on('roomUsers', ({ room, users }) => {
            setRoom(room)
            setRoomUsers(users)
        })

        //listen on chat message 
        socket.on('chat-message', msg => {
            setMessages((messages => [...messages, msg]))
        })

        // disconnection of user after leaving the room
        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [location.search]);


    return (
        <div className='chat-wrapper'>
            <ChatUsers roomUsers={roomUsers} room={room} />
            <div className="chat__messages">
                <ChatMessages messages={messages} />
                <MessageInput
                    message={message}
                    sendMessage={sendMessage}
                    setMessage={setMessage}
                    sendMessageBtn={sendMessageBtn} />
            </div>
        </div>
    )
}
