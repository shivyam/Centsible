import os
# from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

# Load environment variables
# load_dotenv()

app = Flask(__name__)
cors= CORS(app, origins="*")

@app.route('/')
def home():
    return "Hello, Flask!"

# First, make sure you have Flask installed
# Install Flask
# $ pip install Flask


# Load environment variables


# Initialize Flask app
app = Flask(__name__)

# Set up API key
api_key = "AIzaSyCNn5mn0P_rHc3SwZHoOhP3tswC9aich1Q"  # Use environment variable for security
genai.configure(api_key=api_key)

# Model configuration
generation_config = {
    "temperature": 0.7,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 200
}

# Initialize the model
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config
)

# Define the chatbot endpoint
@app.route("/chatbot", methods=["POST"])
def chatbot():
    # Get request data
    data = request.get_json()
    question = data.get("question")

    # Start the chat session with no history
    chat_session = model.start_chat(history=[])

    # Include website summary context along with the user's question
    
    full_question = {question}

    # Get the model's response to the user question
    response = chat_session.send_message(full_question)

    # Extract the response text
    model_response = response.candidates[0].content.parts[0].text
    print(model_response)

    # Return the response as JSON
    return jsonify({"response": model_response})



if __name__ == '__main__':
    app.run(debug=True)

