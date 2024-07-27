from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
import os
from openai import OpenAI
from controllers.scripts import get_script_details, get_user_scripts, add_new_script
from supabase import create_client, Client

# Load environment variables from .env file
load_dotenv()

# Get the API key from environment variables
api_key = os.getenv('OPENAI_API_KEY')
openai.api_key = api_key

# Initialize Supabase client
supabase_url = os.getenv('SUPABASE_URL')
supabase_key = os.getenv('SUPABASE_KEY')
supabase: Client = create_client(supabase_url, supabase_key)

app = FastAPI()

class ScriptRequest(BaseModel):
    parameters: List[str]
    user_id: str

class ScriptResponse(BaseModel):
    content: str

class UserCredentials(BaseModel):
    email: str
    password: str
    name: str

class UserResponse(BaseModel):
    user_id: str
    email: str

@app.post("/generate_script", response_model=ScriptResponse)
async def generate_script(request: ScriptRequest):
    if len(request.parameters) != 4:
        raise HTTPException(status_code=400, detail="Exactly 4 parameters are required: Genre, Title, Description, Length")
    
    user_id = request.get('user_id', None)
    genre = request.parameters[0]
    title = request.parameters[1]

    if user_id is None:
        raise HTTPException(status_code=400, detail="User ID is required")

    try:
        completion = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a content creation tool that will try to produce high-performing scripts for short-form video platforms such as Instagram Reels, TikTok, and YouTube Shorts. The user will provide you with these parameters in the form of a Python string array: Genre, Title, Description, Length (in seconds). You will tailor your script to work well with the presumed audience demographics (based on the aforementioned parameters). Specifically, you will do your best to optimize for the appropriate tone and vocabulary depending on the parameters."},
                {"role": "user", "content": str(request.parameters)}
            ]
        )
        generated_script = completion.choices[0].message.content
        add_new_script(user_id=user_id, script_text=generated_script, title=title, genre=genre)
        return ScriptResponse(content=generated_script)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/scripts")
async def get_scripts(user_id: str):
    try:
        scripts = get_user_scripts(user_id)
        return {"scripts": scripts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/scripts/details")
async def get_scripts(script_id: str):
    try:
        script_details = get_script_details(script_id)
        return script_details
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/signup", response_model=UserResponse)
async def signup(credentials: UserCredentials):
    try:
        response = supabase.auth.sign_up({
            "email": credentials.email,
            "password": credentials.password,
            "options": {
                "data": {
                    "name": credentials.name
                }
            }
        })
        user = response.user
        return UserResponse(user_id=user.id, email=user.email)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/login", response_model=UserResponse)
async def login(credentials: UserCredentials):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": credentials.email,
            "password": credentials.password,
        })
        user = response.user
        return UserResponse(user_id=user.id, email=user.email)
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid credentials")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
