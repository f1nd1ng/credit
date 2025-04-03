from django.urls import path
from backend.simulator.views import credit_score_simulation  

urlpatterns = [
    
    path('api/credit_score_simulation/', credit_score_simulation, name='credit_score_simulation'),  # Credit score simulation route
]
