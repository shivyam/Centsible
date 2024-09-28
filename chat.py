

import os
import google.generativeai as genai

from dotenv import load_dotenv
load_dotenv()


genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Create the model
generation_config = {
  "temperature": 0.5,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-pro",
  generation_config=generation_config,
  system_instructions = "You are simplifying complex concepts into simple terms and brief, in-depth explanations",
)

print("Bot: hello, how cna i help you?")
history = [{
        "role": "user",
        "parts": "scraped data"
      }]

while True:

    user_input = input("You: ")

    chat_session = model.start_chat(
        history= history
    )

    response = chat_session.send_message(user_input)

    model_response = response.text
    history.append({"role" : "user", "parts": [user_input]})
    history.append({"role" : "model", "parts": [model_response]})

    print(model_response)
    print(chat_session.history)
    