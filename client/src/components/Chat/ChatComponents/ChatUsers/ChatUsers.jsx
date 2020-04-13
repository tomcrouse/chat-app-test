import React from 'react';

const ChatUsers = ({ roomUsers, room }) => {
    return (
        <div className="chat__users">
            <h3 className="chat__room-name"> Room name: </h3>
            <h3>{room}</h3>
            <h3 className="chat__user-list-header"> Users online: </h3>
            <div className="chat__user-list">
                {roomUsers.map((user, i) => <li key={i} className="chat__user">{user.name}</li>)}
            </div>
        </div>
    );
}

export default ChatUsers;
