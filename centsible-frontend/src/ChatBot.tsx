import React, { useState, useEffect } from 'react';
import TextComponent from './components/TextComponent';
import api from "./api/axiosInstance";

type Message = {
    user?: string;
    bot?: string;
};

interface BotResponse {
    response: string;  // Adjust this based on the actual structure
  }
  
const ChatBot = () => {
    const [history, setHistory] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');

    // Load chat history from localStorage on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem("history");
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    // Save chat history to localStorage whenever history changes
    useEffect(() => {
        localStorage.setItem("history", JSON.stringify(history));
    }, [history]);

    // Update input as the user types
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value);
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (input.trim()) {
            // Update history with user input
            setHistory((prev) => [...prev, { user: input }]);

            try {
                // Make a POST request to the API with the input
                const response = await api.post('/chatbot', { question: input });

                // Extract the bot's response
                const botResponse = (response.data as BotResponse).response;

                // Update history with the bot's response
                setHistory((prev) => [...prev, { bot: botResponse }]);
            } catch (error) {
                console.error("Error fetching bot response:", error);

                // Update history with a fallback message if an error occurs
                setHistory((prev) => [...prev, { bot: "Response is null" }]);
            } finally {
                // Clear the input field after submitting
                setInput('');
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
