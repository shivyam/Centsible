from fastapi import FastAPI
from routers.chat import router as chat_router  # Importing the router

app = FastAPI()

# Include the router directly
<<<<<<< HEAD
app.include_router(summary_router)

=======
app.include_router(chat_router)
>>>>>>> 63b6bec43958468316b1f438678c91617f7a6d02
