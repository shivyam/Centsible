"""
Install the Google AI Python SDK

$ pip install google-generativeai
"""
# change it so system instructions has website summary context 
# also want output to change in react 
import os
from fastapi import FastAPI, APIRouter
import google.generativeai as genai
from dotenv import load_dotenv
from pydantic import BaseModel

# Load environment variables
load_dotenv()

# Initialize FastAPI and APIRouter
app = FastAPI()
router = APIRouter()

# Define the request model
class ChatRequest(BaseModel):
    question: str

# Define the chatbot endpoint
@router.post("/chatbot/" , tags=["chatbot"])
async def chatbot(request: ChatRequest):
    # Set up API key
    api_key = "AIzaSyCNn5mn0P_rHc3SwZHoOhP3tswC9aich1Q"
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

    # Start the chat session with no history
    chat_session = model.start_chat(history=[])

    # Get the model's response to the user question
    response = chat_session.send_message(request.question)

    # Extract the response text
    model_response = response.candidates[0].content.parts[0].text
    print(model_response)

    # Return the response as JSON
    return {"response": model_response}

