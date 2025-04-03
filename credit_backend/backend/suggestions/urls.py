from django.urls import path
from backend.suggestions.views import get_top_cards

urlpatterns = [
    path('api/top_cards/', get_top_cards, name='top_cards'), 
]
