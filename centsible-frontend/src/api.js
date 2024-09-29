// src/api.js

const api = {
    sendBotMessage: async (message) => {
        const response = await fetch('/chatbot/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: message }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.response; // Adjust based on your API response structure
    },
};

export default api;
