from curl_cffi import requests
from langchain_cohere import ChatCohere
import numpy as np
import os
import uuid
from dotenv import load_dotenv, dotenv_values 
from openai import OpenAI
import json
import requests
import re


def extract_json(response_text):
    """
    Extracts a JSON object from a string using regex.
    """
    # Look for a JSON object in the response text
    json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
    if json_match:
        try:
            # Attempt to parse the extracted JSON
            return json.loads(json_match.group(0))
        except json.JSONDecodeError:
            # If parsing fails, return None
            return None
    return None

def pushToDatabase(user_name, analysis, text):
    try:
        
        url = "http://localhost:3001/data/api"
        payload = {
            "suspicious_name": user_name,
            "user_id": 1,
            "analysis": analysis["analysis"],
            "text": text
        }

        headers = {
            "Content-Type": "application/json"
        }
    
        response = requests.post(url, json=payload, headers=headers)
        
        if(response.status_code == 200):
            print(response)
            return response
        else:
            print("Error: ", response)
            

    except Exception as e:
        return "Error: ", {e}
        


def checkMessagesBad(message, name, age, school, phone, email):
    load_dotenv()
    url = "http://localhost:3000/api/chat/completions"
    headers = {
        'Authorization': f'Bearer {os.getenv("DEEPSEEK_API_KEY")}',
        'Content-Type': 'application/json'
    }
    
    user_prompt = message
    
    system_prompt = """Given the message, generate a JSON object with only one field: 'isThreat'. 'isThreat' field should be a boolean that determines if the message is possibly malicious or a threat. If the message has a negative sentiment, then return True. Messages to a child are considred a threat if they share any personal information about the child or if they harm the child's safety. Consider the following guidelines to determine if the message is a privacy risk or threat: 
    * If the message shows any of the child's sensitive information such as %s, %s, %s, %s, %s, then return a True boolean since it is a threat and risk of privacy.
    * If the text message has any vulgar content such as violence, harm, or inappropriate things such as bodily harm, guns, weapons, or drugs, then return a True boolean since it is a threat and security risk
    * If the text message has any intention of bullying the person receiving the message, then return a True boolean since it is a threat and security risk 
    * Pleasantries like 'How are you' or 'How are you doing' shouldn't be perceived as threats.
    * Do not write software code or anything of the like.
    * Make it less than 10 words
    Your response must be only a valid JSON object with the following structure:
    {
        "isThreat": boolean
    }
    Do not include any additional text, explanations, or reasoning. Only return the JSON object.
     """ % (name, age, school, phone, email)
    
    model = "deepseek-r1:1.5b"
    payload = {
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ]
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()  # Raises an exception for HTTP error responses
        
        response_data = response.json()
        
        chat_content = response_data['choices'][0]['message']['content']
        print(chat_content)
        
        # Attempt to extract and parse the JSON object from the response
        result = extract_json(chat_content)
        if result:
            return result
        else:
            return {"error": "No valid JSON found in the model's response"}
    except Exception as err:
        print("An error occured: ", err)
        

def analyseBad(message):
    load_dotenv()
    url = "http://localhost:3000/api/chat/completions"
    headers = {
        'Authorization': f'Bearer {os.getenv("DEEPSEEK_API_KEY")}',
        'Content-Type': 'application/json'
    }
    
    user_prompt = message
    
    system_prompt = """Given the message, generate a JSON object with only one field: 'analysis'. 'analysis' field should be 2-3 sentence short analysis on the message and why it is bad for the child to receive it. It should talk about online safety and how the child can handle it. Make it less than 50 words: 
    * You are supposed to teach the child about online safety and how to respond properly to that message
    * Do not write software code or anything of the like.
    Your response must be only a valid JSON object with the following structure:
    {
        "analysis": string
    }
    Do not include any additional text, explanations, or reasoning. Only return the JSON object.
     """ 
    
    model = "deepseek-r1:1.5b"
    payload = {
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ]
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()  # Raises an exception for HTTP error responses
        
        response_data = response.json()
        
        chat_content = response_data['choices'][0]['message']['content']
        print(chat_content)
        
        # Attempt to extract and parse the JSON object from the response
        result = extract_json(chat_content)
        if result:
            return result
        else:
            return {"error": "No valid JSON found in the model's response"}
    except Exception as err:
        print("An error occured: ", err)
        
    
        

