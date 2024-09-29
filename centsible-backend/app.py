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


if __name__ == '__main__':
    app.run(debug=True, port=8000)
