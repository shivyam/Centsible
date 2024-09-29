import React, { useState, useEffect } from 'react';
import TextComponent from './components/TextComponent';

import api from "./api/axiosInstance";
type Message = {
    user?: string;
    bot?: string;
};

const ChatBot = () => {
    const [history, setHistory] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        const savedHistory = localStorage.getItem("history");
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("history", JSON.stringify(history));
    }, [history]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value);
    };




    const handleSubmit = async () => {
        if (input) {
            // Update history with user input
            setHistory((prev) => [...prev, { user: input }]);
            setInput('');  // Clear input field
            
            try {
                // Call the API to get the bot response
                const botResponse = await api.post('/chatbot', input);
                //setHistory((prev) => [...prev, { bot: botResponse }]);
                console.log(botResponse.response);
            } catch (error) {
                console.error("Error fetching bot response:", error);
                setHistory((prev) => [...prev, { bot: "Sorry, there was an error." }]);
            }
        }
    };

    return (
        <>
            <div className="font-bold text-3xl pb-4">Welcome!</div>
            <TextComponent history={history} />
            <div className="flex flex-col items-center gap-2">
                <textarea
                    onChange={handleChange}
                    value={input}
                    className="w-72 h-28 px-3 py-2 rounded-lg border border-black resize-none"
                    placeholder="Ask your personalized bot a question..."
                />
                <button onClick={handleSubmit} className="w-40 h-10 bg-blue-100 border border-black">
                    Send
                </button>
            </div>
        </>
    );
};

export default ChatBot;
