import React, { useState } from 'react';
import TextComponent from './TextComponent';
import api from "../api/axiosInstance";

type Message = {

    //allows both user and bot to be key values, does not put a strict restriction on having both
    user?: string;
    bot?: string;
};

interface BotResponse {
    response: string; 
}

const ChatBot = () => {
    const [history, setHistory] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');

    //update input as the user types
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value);
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (input.trim()) {

            //update history with user input
            setHistory((prev) => [...prev, { user: input }]);

            try {
                
                const response = await api.post('/chatbot', { question: input });

                //get chatbot response from backend
                const botResponse = (response.data as BotResponse).response;

                //update history with the bot's response
                setHistory((prev) => [...prev, { bot: botResponse }]);
            } catch (error) {
                console.error("Error fetching bot response:", error);

                //update history with a fallback message if an error occurs
                setHistory((prev) => [...prev, { bot: "Response is null" }]);
            } finally {
                //clear the input field after submitting
                setInput('');
            }
        }
    };

    return (
        <>
            <TextComponent history={history} />
            <div className="flex flex-col items-center gap-2">
                <textarea
                    onChange={handleChange}
                    value={input}
                    className="w-72 h-28 px-3 py-2 rounded-lg border border-black resize-none"
                    placeholder="Ask your personalized bot a question about your article!"
                />
                <button onClick={handleSubmit} className="w-40 h-10 bg-blue-100 border border-black rounded-lg hover:bg-blue-400">
                    Send
                </button>
            </div>
        </>
    );
};

export default ChatBot;
