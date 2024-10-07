# Centsible: Making Finance "Cents-ible"

## Inspiration

Centsible was born from a need to make finance more accessible, especially for individuals who might be unfamiliar with financial concepts. One of our team members, a first-generation immigrant to Canada, shared her experiences of struggling to understand basic financial terms, such as what a credit limit meant. Financial websites can be overwhelming with jargon like 'RRSPs' and dense information. We aimed to simplify that complexity with a virtual assistant that explains everything in plain terms—making it make *cents*.

## What It Does

Centsible is a **Chrome extension** designed to simplify complex financial concepts for users of all backgrounds. It works by:

- **Summarizing financial content** on websites using Hugging Face's BART model.
- **Extracting key financial terms** with AI-powered keyword extraction.
- Providing real-time, **contextual explanations** for financial concepts via Google’s Gemini API.
- Featuring a **built-in chatbot** that enables users to ask questions about financial topics while browsing.

With these tools, Centsible ensures users can explore finance more intuitively, making complex terms and topics accessible.

## Key Features

- **Financial Keyword Extraction**: Automatically identifies and highlights key financial terms like 'RRSPs', 'Credit Score', etc.
- **Personalized Summarization**: Leverages BART for concise summaries of web pages and articles.
- **Interactive Chatbot**: Powered by Gemini 1.5, the chatbot provides real-time explanations and answers based on user queries.
- **Customization Options**: Users can select different expertise levels (Beginner, Intermediate, Advanced) to receive explanations suited to their financial literacy.

## How We Built It

Centsible was developed as a **Chrome extension** using:
- **React** and **Tailwind CSS** for the front-end interface.
- **Flask** and **Python** for the back-end API server.
- **Google's Gemini API** for real-time market data and chatbot integration.
- **Hugging Face** models for summarization and keyword extraction of financial terms.

## Challenges We Faced

Building Centsible came with a series of challenges:
- **API Integration**: Connecting Gemini with keyword extraction and chatbot features required careful handling of response formats and data consistency.
- **First-Time Extension Development**: This was the first time many of our team members worked on a Chrome extension, leading to a steep learning curve.
- **Backend-Frontend Communication**: Ensuring seamless data transfer between the backend Flask API and the frontend React interface presented obstacles, especially in handling real-time updates and asynchronous calls.

## Accomplishments

- **Successfully integrated APIs** from Google and Hugging Face, providing real-time financial insights.
- Built a **working Chrome extension** despite the team’s initial unfamiliarity with this technology.
- Created a solution to make finance more accessible and understandable, contributing to financial inclusion and literacy.

## What We Learned

- **Teamwork**: We learned how to collaborate effectively, utilizing each member's strengths and dividing tasks to maximize efficiency.
- **Version Control**: Using Git and GitHub taught us how to manage changes and collaborate on code efficiently.
- **API Usage**: We deepened our understanding of various APIs, learning how to make API calls, handle responses, and integrate third-party tools into our system.

## What’s Next for Centsible

- **Resource Tab**: Adding curated learning pathways (articles, podcasts, videos) based on the financial terms identified by the tool.
- **Personalization**: Incorporating user profiles to customize content based on financial goals, interests, and age groups.
- **Enhanced Accessibility**: Adding features like a voice plugin for reading financial terms aloud, multilingual support, and text customization.
- **Smart Recommendations**: Using AI-driven suggestions based on user engagement to provide tailored financial guidance.

## Tech Stack

### Front-End
- **React**
- **TypeScript**
- **Tailwind CSS**

### Back-End
- **Flask**
- **Python**

### APIs and Libraries
- **Google's Gemini API**
- **Hugging Face (BART and DistilBERT)**
- **Postman** for API testing
- **Axios** for making HTTP requests from the front-end

## Installation and Setup

To get started with Centsible:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/centsible.git
   
2. **Install dependencies in both back-end and front-end folders using**:
   ```bash
   npm install


3.  **Compile and run front end in front end directory using**:
   ```bash
   npm run build

   ```bash
   npm run dev



3.  **Compile and run back end in back end directory using**:
   ```bash
   python3 app.py

4. Load the dist folder in front-end folder as unpacked in Chrome extensions to use this extension




