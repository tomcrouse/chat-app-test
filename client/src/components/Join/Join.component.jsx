import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Join() {

    // set Hooks for user and room authorization
    const [user, setUser] = useState('')
    const [room, setRoom] = useState('')

    const enter = e => {
        if (!user) {
            e.preventDefault()
            alert('Type your user name')
            return
        }
        if (!room) {
            e.preventDefault()
            alert('Type room name')
            return
        }
        else {
            return
        }
    }

    return (

        <form className="form">
            <input type="text"
                className="input"
                placeholder="Write your name..."
                onChange={(e) => setUser(e.target.value)} />
            <input type="text"
                className="input"
                placeholder="Write room name..."
                onChange={(e) => setRoom(e.target.value)} />
            <Link
                className='join'
                onClick={(e) => enter(e)}
                to={`/chat?user=${user}&room=${room}`}>
                <button type="submit" className="btn"> Join Chat </button>
            </Link>
        </form>

    )
}
