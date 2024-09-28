from fastapi import FastAPI
from routers.summary import router as summary_router  # Importing the router

app = FastAPI()

# Include the router directly
app.include_router(summary_router)

