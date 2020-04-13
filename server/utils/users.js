const users = []

const addUser = (id, name, room) => {

    name = name.trim()
    room = room.trim()

    const existingUser = users.find(user => user.name === name && user.room === room)

    if (existingUser) {
        console.log('error')
        return {
            error: 'User nickname is already taken'
        }
    } else {
        const newUser = {
            id,
            name,
            room,
        }
        users.push(newUser)
        return {
            newUser
        }
    }
}

const getUser = id => {
    return users.find(user => id === user.id)
}

const deleteUser = id => {
    const index = users.findIndex(user => id === user.id)
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getRoomUsers = room => {
    return users.filter(user => user.room === room)
}

module.exports = {
    addUser,
    getUser,
    deleteUser,
    getRoomUsers
}