import time
from dotenv import load_dotenv
import os
import openai

# Load environment variables from .env file
load_dotenv()

# Get the API key from environment variables
api_key = os.getenv('OPENAI_API_KEY')

client = openai.OpenAI(
  api_key=api_key
)

fine_tuned_model = job_status['fine_tuned_model']
completion = openai.ChatCompletion.create(
    model=fine_tuned_model,
    messages=[
        {"role": "system",
            "content": "You are a content creation tool that will try to produce high-performing scripts for short-form video platforms such as Instagram Reels, TikTok, and YouTube Shorts. The user will provide you with these parameters in the form of a Python string array: Genre, Title, Description, Length (in seconds). You will tailor your script to work well with the presumed audience demographics (based on the aforementioned parameters). Specifically, you will do your best to optimize for the appropriate tone and vocabulary depending on the parameters."},
        {"role": "user",
            "content": "['Education', 'The History of the Internet', 'A brief overview of the history of the internet, from its inception to the present day.', '30']"}
    ]
)
print(completion.choices[0].message['content'])
