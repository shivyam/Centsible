from fastapi import FastAPI
from routers.chat import router as chat_router  # Importing the router

app = FastAPI()

# Include the router directly
app.include_router(chat_router)
