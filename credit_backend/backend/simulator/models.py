from django.db import models
from django.db import models
from backend.models import User  # ✅ Use the existing User model

class CreditScore(models.Model):
    EMI_PAYMENT_CHOICES = [
        ('On-Time', 'On-Time'),
        ('Delayed', 'Delayed'),
    ]

    CREDIT_MIX_CHOICES = [
        ('balanced', 'Balanced'),
        ('unbalanced', 'Unbalanced'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    emi_payment = models.CharField(max_length=10, choices=EMI_PAYMENT_CHOICES)
    credit_usage = models.DecimalField(max_digits=10, decimal_places=2)
    credit_limit = models.DecimalField(max_digits=10, decimal_places=2)
    num_credit_cards = models.IntegerField()
    credit_mix = models.CharField(max_length=10, choices=CREDIT_MIX_CHOICES)
    hard_inquiries = models.IntegerField()
    credit_history = models.IntegerField()
    monthly_debt = models.DecimalField(max_digits=10, decimal_places=2)
    monthly_income = models.DecimalField(max_digits=10, decimal_places=2)
    credit_score = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Credit Score for {self.user.username} - {self.credit_score}"
