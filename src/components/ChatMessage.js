import React from 'react';
import './chatMessage.css';

const ChatMessage = ({ message }) => {
    return (
        <div className={`chat-message ${message.sender}`}>
        <img
        src={
          message.sender === 'user'
            ? 'https://randomuser.me/api/portraits/men/75.jpg'
            : 'https://randomuser.me/api/portraits/women/75.jpg'
        }
        alt={`${message.sender} avatar`}
        className="avatar"
      />
            <div className={`message-bubble ${message.sender}`}>
                {message.text}
            </div>
        </div>
    );
};
export default ChatMessage;