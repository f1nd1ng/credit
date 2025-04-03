from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import pandas as pd
import numpy as np
import os
from backend.finance_tracker.models import Transaction

# Load the dataset
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_PATH = os.path.join(BASE_DIR, "suggestions", "cards.csv")
df = pd.read_csv(CSV_PATH)

def calculate_score(df, user_income, is_salaried, user_expenditure):
    df = df.copy()
    income_col = "Minimum Salaried Income" if is_salaried else "Minimum ITR for Self Employed"
    df = df[df[income_col] <= user_income]
    
    total_expenditure = sum(user_expenditure.values())
    df["Adjusted Annual Fee"] = np.where(df["annual fee waiver"] <= total_expenditure, 0, df["Renewal Fee"])
    
    category_columns = ["shopping", "travel", "dining", "movies", "fuel", "food", "bill payment", "stays", "business expenses"]
    df["Expenditure Match"] = sum(df[cat] * user_expenditure.get(cat, 0) for cat in category_columns)
    
    df["Score"] = (
        np.log(df[income_col] + 1)
        - 0.001 * df["Joining Fee"]
        - 0.002 * df["Adjusted Annual Fee"]
        + df["welcome scores"]
        + df["Expenditure Match"]
    )
    
    return df.sort_values(by="Score", ascending=False)[
        ["Card Name", "Bank Name", "Joining Fee", "Renewal Fee", "Minimum Salaried Income", 
         "annual fee waiver", "Score"]
    ].reset_index(drop=True)

def fetch_financial_data(user):
    from datetime import datetime
    from django.db.models import Sum
    
    today = datetime.today()
    
    # Fetch user's annual income
    monthly_income = (
        Transaction.objects.filter(
            user=user,
            transaction_type="income",
            date__year=today.year,
            date__month=today.month
        ).aggregate(total_income=Sum("amount"))["total_income"] or 0
    )
    annual_income = monthly_income * 12  

    # Fetch user's category-wise expenditure
    category_expenditure = (
        Transaction.objects.filter(user=user, transaction_type="expense")
        .values("category")
        .annotate(total_amount=Sum("amount"))
    )
    
    category_expenditure = {item["category"]: float(item["total_amount"]) for item in category_expenditure} if category_expenditure else {}
    return annual_income, category_expenditure

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_top_cards(request):
    try:
        user = request.user  
        is_salaried = request.query_params.get("salaried", "true").lower() == "true"  

        user_income, user_expenditure = fetch_financial_data(user)
        filtered_df = calculate_score(df, user_income, is_salaried, user_expenditure)
        
        return Response(filtered_df.head(5).to_dict(orient="records"))
    except Exception as e:
        return Response({"error": str(e)}, status=400)

