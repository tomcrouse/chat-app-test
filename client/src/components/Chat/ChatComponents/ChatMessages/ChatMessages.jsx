import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../Message/Message'

const ChatMessages = ({ messages }) => {
    return (
        <ScrollToBottom className="chat__messages-viewport">
            {messages.map(({ username, text, time }, index) => {
                return <Message
                    key={index}
                    username={username}
                    text={text}
                    time={time}
                    index={index} />
            })}
        </ScrollToBottom>
    );
}

export default ChatMessages;
