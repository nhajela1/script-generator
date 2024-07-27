from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
import os
import openai

# Load environment variables from .env file
load_dotenv()

# Get the API key from environment variables
api_key = os.getenv('OPENAI_API_KEY')
openai.api_key = api_key

app = FastAPI()

class ScriptRequest(BaseModel):
    parameters: List[str]

class ScriptResponse(BaseModel):
    content: str

@app.post("/generate_script", response_model=ScriptResponse)
async def generate_script(request: ScriptRequest):
    if len(request.parameters) != 4:
        raise HTTPException(status_code=400, detail="Exactly 4 parameters are required: Genre, Title, Description, Length")

    try:
        completion = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a content creation tool that will try to produce high-performing scripts for short-form video platforms such as Instagram Reels, TikTok, and YouTube Shorts. The user will provide you with these parameters in the form of a Python string array: Genre, Title, Description, Length (in seconds). You will tailor your script to work well with the presumed audience demographics (based on the aforementioned parameters). Specifically, you will do your best to optimize for the appropriate tone and vocabulary depending on the parameters."},
                {"role": "user", "content": str(request.parameters)}
            ]
        )
        return ScriptResponse(content=completion.choices[0].message['content'])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
