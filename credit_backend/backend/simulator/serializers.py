from rest_framework import serializers
from backend.simulator.models import CreditScore

class CreditScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditScore
        fields = '__all__'  # ✅ Include all fields
