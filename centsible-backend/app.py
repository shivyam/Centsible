import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

# Load environment variables (optional)
# from dotenv import load_dotenv
# load_dotenv()

app = Flask(__name__)
CORS(app, origins="*")  # Allows cross-origin requests

# Set up API key (ideally, load from environment variables for security)
api_key = os.getenv("GOOGLE_API_KEY", "AIzaSyCChep1OQW18g5Wg5_6fRReg4JzGdI0hmI")
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

@app.route('/')
def home():
    return "Hello, Flask!"

# Define the chatbot endpoint to handle POST requests
@app.route("/chatbot", methods=["POST"])
def chatbot():
    try:
        # Get the incoming request data
        data = request.json
        question = data.get("question")

        if not question:
            return jsonify({"error": "Question is missing"}), 400

        print(f"User's question: {question}")

        # Start the chat session with no history (if needed, you can adjust for history)
        chat_session = model.start_chat(history=[])

        # Send the user's question to the model
        response = chat_session.send_message(question)

        # Extract the model's response text
        model_response = response.candidates[0].content.parts[0].text
        print(f"Model's response: {model_response}")

        # Return the model's response as JSON
        return jsonify({"response": model_response})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to process the request"}), 500

# Define the chatbot endpoint
@app.route("/Customize", methods=["POST"])
def Customize():
    # Get request data
    data = request.get_json()
    summary = data.get("summary")
    expertise_level = data.get("expertise_level")  

    # Start the chat session with no history
    chat_session = model.start_chat(history=[])

    # Include website summary context along with the user's question
    if expertise_level == "Beginner":
         full_question = f"This is a summary of the topics I'm interested in learning about: {summary}\nI am a beginner in this topic so please explain this topic in extreme detail, giving many examples and using easy to follow language"

    elif expertise_level == "Intermediate":
        full_question = f"This is a summary of the topics I'm interested in learning about: {summary}\nI have a decent understanding of this topic, but I'd appreciate a more in-depth explanation with additional examples and insights to deepen my knowledge."

    elif expertise_level == "Advance":
        full_question = f"This is a summary of the topics I'm interested in learning about: {summary}\nI am quite familiar with this topic, so please provide a comprehensive explanation, focusing on nuanced details, advanced concepts, and practical applications."


    # Get the model's response to the user question
    response = chat_session.send_message(full_question)

    # Extract the response text
    model_response = response.candidates[0].content.parts[0].text
    print(model_response)

    # Return the response as JSON
    return jsonify({"response": model_response})

@app.route("/Keywords", methods=["POST"])
def Keywords():
    # Get request data
    data = request.get_json()
    keywords = data.get("keywords") 

    # Start the chat session with no history
    chat_session = model.start_chat(history=[])

    # Include website summary context along with the user's question
    full_question = f"This is a list of {keywords} I care about. Please define them all and provide examples when applicable"

    # Get the model's response to the user question
    response = chat_session.send_message(full_question)

    # Extract the response text
    model_response = response.candidates[0].content.parts[0].text
    print(model_response)

    # Return the response as JSON
    return jsonify({"response": model_response})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
