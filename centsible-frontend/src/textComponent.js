// src/components/TextComponent.js

import React from 'react';

const TextComponent = ({ history }) => {
    return (
        <div className="chat-history border border-gray-300 p-2 rounded-lg max-h-60 overflow-auto">
            {history.map((message, index) => (
                <div key={index} className="message">
                    {message.user && (
                        <div className="user-message text-blue-500">
                            <strong>You:</strong> {message.user}
                        </div>
                    )}
                    {message.bot && (
                        <div className="bot-message text-green-500">
                            <strong>Bot:</strong> {message.bot}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TextComponent;
