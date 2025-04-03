from django.urls import path
from backend.chatbot.views import chat

urlpatterns = [
    path("", chat, name="chat"),
]
