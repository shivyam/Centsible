import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app, origins="*")  


api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)


generation_config = {
    "temperature": 0.7,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 250
}

# Initialize the model
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config
)

#allows user to interact with chatbot
@app.route("/chatbot", methods=["POST"])
def chatbot():
    try:
        
        #retrieves data from frontend
        data = request.json
        question = data.get("question")

        if not question:
            return jsonify({"error": "Question is missing"}), 400

        print(f"User's question: {question}")

        #chatbot starts with no history
        chat_session = model.start_chat(history=[])

        #send user's question/input to chatbot
        response = chat_session.send_message(question)

        #receives bot response
        model_response = response.candidates[0].content.parts[0].text
    
        return jsonify({"response": model_response})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to process the request"}), 500






#generates summary based on expertise level
@app.route("/customize", methods=["POST"])
def customize():
  
    data = request.json
    summary = data.get("summary")
    expertise_level = data.get("expertise_level")  

    
    chat_session = model.start_chat(history=[])

    #include website summary context along with the user's question
    if expertise_level == "beginner":
         full_question = f"This is a summary of the topics I'm interested in learning about: {summary}\nI am a beginner in this topic so please explain this topic in extreme detail, giving many examples and using easy to follow language. Avoid special characters."

    elif expertise_level == "intermediate":
        full_question = f"This is a summary of the topics I'm interested in learning about: {summary}\nI have a decent understanding of this topic, but I'd appreciate a more in-depth explanation with additional examples and insights to deepen my knowledge. Avoid special characters. "

    elif expertise_level == "advanced":
        full_question = f"This is a summary of the topics I'm interested in learning about: {summary}\nI am quite familiar with this topic, so please provide a comprehensive explanation, focusing on nuanced details, advanced concepts, and practical applications. Avoid special characters."


    #get the model's response to the user question
    response = chat_session.send_message(full_question)

    model_response = response.candidates[0].content.parts[0].text
    stripped_response = model_response.replace("*", "").replace("#", "")
    print(stripped_response)

    return jsonify({"response": stripped_response})






@app.route("/keywords", methods=["POST"])
def keywords():

    data = request.get_json()
    keywords = data.get("keywords") 

    chat_session = model.start_chat(history=[])


    full_question = f"This is a list of {keywords} I care about. Please define them all and provide examples when applicable"

  
    response = chat_session.send_message(full_question)

    model_response = response.candidates[0].content.parts[0].text
    print(model_response)

    return jsonify({"response": model_response})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
