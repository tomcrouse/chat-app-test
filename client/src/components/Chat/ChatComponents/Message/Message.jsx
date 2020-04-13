import React from 'react';
import ReactEmoji from 'react-emoji'

const Message = ({ username, text, time, index }) => {
    return (
        <div key={index}
            className='chat__message'>
            <span> {username}
                <span className="chat__text">
                    {ReactEmoji.emojify(text)}
                    <span className="chat__time">{time}</span>
                </span>
            </span>
        </div>
    );
}

export default Message;
