"""
Install the Google AI Python SDK

$ pip install google-generativeai
"""
# change it so system instructions has website summary context 
# also want output to change in react 
# from fastapi import FastAPI, APIRouter, HTTPException
# pip install python-dotenv
# python -m venv venv
# source venv/bin/activate
import json
import os
# Initialize FastAPI
from fastapi import FastAPI, APIRouter
from pydantic import BaseModel
import requests

router = APIRouter()


@router.post("/summary")
def generate_explanation(data: str):
   
   return{
      
   }