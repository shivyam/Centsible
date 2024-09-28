"""
Install the Google AI Python SDK

$ pip install google-generativeai
"""
# change it so system instructions has website summary context 
# also want output to change in react 
import os
import google.generativeai as genai

genai.configure(api_key="AIzaSyCNn5mn0P_rHc3SwZHoOhP3tswC9aich1Q")

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
