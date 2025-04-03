from django import forms

class CreditScoreForm(forms.Form):
    monthly_emi = forms.FloatField(label="Monthly EMI Payment")
    credit_utilization = forms.FloatField(label="Credit Utilization Ratio (%)")
    num_credit_cards = forms.IntegerField(label="Number of Credit Cards")
    credit_mix = forms.ChoiceField(
        choices=[("balanced", "Balanced"), ("unbalanced", "Unbalanced")],
        label="Credit Mix"
    )
    hard_inquiries = forms.IntegerField(label="Number of Hard Inquiries")
    credit_history_length = forms.IntegerField(label="Credit History Length (Years)")
    debt_to_income_ratio = forms.FloatField(label="Debt-to-Income Ratio (%)")