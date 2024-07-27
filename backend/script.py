import time
from dotenv import load_dotenv
import os
import openai

# Load environment variables from .env file
load_dotenv()

# Get the API key from environment variables
api_key = os.getenv('OPENAI_API_KEY')

# Initialize the OpenAI client
openai.api_key = api_key

# Upload the training file: Use the OpenAI API to upload your JSONL file
response = openai.File.create(
    file=open("train.jsonl", "rb"),
    purpose="fine-tune"
)
file_id = response['id']

# Create a fine-tuning job: initiate the fine-tuning process using the uploaded file
job = openai.FineTune.create(
    training_file=file_id,
    model="gpt-3.5-turbo-0613"
)

# Monitor the fine-tuning progress: You can check the status of your fine-tuning job using the job ID
job_id = job['id']
job_status = openai.FineTune.retrieve(id=job_id)
print(job_status)

# Polling the job status until it completes
while job_status['status'] not in ['succeeded', 'failed']:
    time.sleep(60)  # Wait for 60 seconds before checking the status again
    job_status = openai.FineTune.retrieve(id=job_id)
    print(job_status['status'])

# Use the fine-tuned model: Once the job is complete, you can use your fine-tuned model in API calls
if job_status['status'] == 'succeeded':
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
else:
    print("Fine-tuning job failed.")
