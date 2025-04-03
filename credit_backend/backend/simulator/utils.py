def calculate_credit_score(data):
    score = 300  # Base score

    # 1. EMI Payment (35% weight)
    if data['emi_payment'] == 'On-Time':
        score += 140
    else:
        score -= 100

    # 2. Credit Utilization Ratio (30% weight)
    utilization = (data['credit_usage'] / data['credit_limit']) * 100
    if utilization <= 30:
        score += 120
    elif utilization <= 50:
        score += 80
    else:
        score -= 50

    # 3. Number of Credit Cards (10% weight)
    if data['num_credit_cards'] >= 3:
        score += 40
    else:
        score -= 20

    # 4. Credit Mix (10% weight)
    if data['credit_mix'] == 'Balanced':
        score += 40
    else:
        score -= 30

    # 5. Hard Inquiries (5% weight)
    if data['hard_inquiries'] == 0:
        score += 20
    elif data['hard_inquiries'] > 3:
        score -= 20

    # 6. Credit History Length (10% weight)
    if data['credit_history_years'] >= 5:
        score += 40
    elif data['credit_history_years'] < 2:
        score -= 30

    # 7. Debt-to-Income Ratio (10% weight)
    dti = (data['monthly_debt'] / data['monthly_income']) * 100
    if dti <= 30:
        score += 40
    elif dti > 50:
        score -= 40

    return min(max(score, 300), 900)