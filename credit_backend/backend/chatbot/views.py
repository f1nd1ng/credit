from django.shortcuts import render
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import markdown
from bs4 import BeautifulSoup
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import os
from dotenv import load_dotenv


load_dotenv()
API_KEY = os.getenv("API_KEY")  

@api_view(["POST"])
@permission_classes([IsAuthenticated])  
def chat(request):
    try:
        data = json.loads(request.body)
        user_message = data.get("message", "")

        if not user_message:
            return Response({"error": "Message cannot be empty."}, status=400)

        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"
        headers = {"Content-Type": "application/json"}
        payload = {
            "contents": [
                {
                    "parts": [{"text": user_message}]
                }
            ]
        }

        response = requests.post(url, json=payload, headers=headers)
        response_data = response.json()

        if response.status_code != 200:
            return Response({"error": response_data.get("error", "API error")}, status=response.status_code)

   
        chatbot_reply = response_data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "No response received.")
        chatbot_reply_html = markdown.markdown(chatbot_reply)
        plain_text = BeautifulSoup(chatbot_reply_html, "html.parser").get_text()

        return Response({"reply": plain_text})

    except Exception as e:
        return Response({"error": str(e)}, status=500)
