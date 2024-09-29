from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# change it so system instructions has website summary context 
# also want output to change in react 
import os
# from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
# pip install python-dotenv
load_dotenv()
# python -m venv venv
# source venv/bin/activate

api_key = os.getenv("GENAI_API_KEY")

genai.configure(api_key=api_key)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create the model
generation_config = {
  "temperature": 0,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 200,
  "response_mime_type": "application/json",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
  system_instruction="You are a financial advisor to those who do not have much background. Eexplain concepts in detail and give examples that are easy for new learners to understand. give the user prompting questions if needed",
)



# router = APIRouter()

# Pydantic model for user input
# class UserInput(BaseModel):
#     input_text: str

# Endpoint to handle chat requests
# @router.post("/chat")
# async def chat(user_input: UserInput):
#     try:
#         # Create a new chat session
#         chat_session = model.start_chat()
        
#         # Send the user input to the model
#         response = chat_session.send_message(user_input.input_text)
#         model_response = response.text
        
#         # Return the model response
#         return {"response": model_response}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# # Include the router
# app.include_router(router)


@app.post("/userMessage")
def getQuestion(user_message: UserMessage):
  print(f"Received message: {user_message.message}") 
    # Return a response (you can customize this)
  return JSONResponse(content={"response": "hi"})







print("Bot: Hi, how can I help you?")
history_tracker =[]
chat_session = model.start_chat(history=history_tracker)
while True: 
    user_input = input("You: ")
    
    response = chat_session.send_message(user_input)

    model_response = response.text
    print(model_response)

    # Append the user input and model response to the history
    history_tracker.append({"role": "user", "content": user_input})
    history_tracker.append({"role": "model", "content": model_response})



