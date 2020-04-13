import React from 'react';

const MessageInput = ({ message, sendMessage, setMessage, sendMessageBtn }) => {
    return (
        <div className="message-input">
            <input type="text"
                className="message-input__input"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => sendMessage(e, message)} />
            <button className="message-input__btn"
                onClick={(e) => sendMessageBtn(e, message)}> Send </button>
        </div>
    );
}

export default MessageInput;
