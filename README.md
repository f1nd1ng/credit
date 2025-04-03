# Cred-It

Cred-It is a financial management platform designed to help users track their credit scores, manage transactions, and analyze financial data.

## Features

- **User Authentication**: Sign up and log in using email, username, password, or Google OAuth.
- **Credit Score Simulator**: Enter financial details to calculate an estimated credit score.
- **Transaction Management**: Add, view, and filter transactions by daily, weekly, monthly, or yearly views.
- **Centralized Authentication**: Integrated with the Finance Tracker app using a shared authentication system.
- **Secure API**: Backend supports authentication via tokens and handles financial data securely.

## Built With

This project was developed using the following technologies:

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)  
[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)  
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)  
[![Gemini API](https://img.shields.io/badge/Gemini%20API-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/gemini-api/docs/api-key)  


## Setup Instructions

### Project Setup (credit/)
1. Navigate to the base directory:
   ```sh
   cd credit/
   ```
2. Create a virtual environment:
   ```sh
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows:
     ```sh
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```sh
     source venv/bin/activate
     ```
4. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
5. Create a `.env` file using `stencil.env` as a reference:
   ```sh
   cp stencil.env .env
   ```
6. Navigate to the backend directory:
   ```sh
   cd credit_backend/
   ```
7. Run database migrations:
   ```sh
   python manage.py migrate
   ```
8. Start the development server:
   ```sh
   python manage.py runserver
   ```

### Frontend Setup (credit_frontend/)
1. Navigate to the frontend directory:
   ```sh
   cd credit_frontend/
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
5. Create a `.env.local` file using `stencil.env.local` as a reference:
   ```sh
   cp stencil.env.local .env.local
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```


## Usage

This project helps users *track expenses, estimate credit scores, and receive personalized credit card recommendations* based on their spending habits. Here’s how it can be used:  

#### *1. Profile Management & Secure Login*  
•⁠  ⁠Users can *sign up, log in, and manage their profiles* securely, with Google login support for convenience.  
•⁠  ⁠Profile details, including *income and expenses,* can be updated to ensure accurate recommendations.  

#### *2. Expense and Income Tracking*  
•⁠  ⁠Users can *log income and categorize expenses* (e.g., groceries, rent, dining) for better financial awareness.  
•⁠  ⁠A *detailed transaction history* helps monitor spending trends.  

#### *3. Personalized Credit Card Recommendations*  
•⁠  ⁠The system *analyzes spending patterns* to suggest the *top 5 credit cards* that best match the user's lifestyle.  
•⁠  ⁠Recommendations consider *rewards, cashback, and benefits and spending habits* to maximize value.  

#### *4. Credit Score Estimation*  
•⁠  ⁠Users can *estimate their credit score* based on financial inputs like income, expenses, and outstanding debt.  
•⁠  ⁠The system helps users understand how different financial decisions *may impact their score.*  

#### *5. Financial Guidance via Chatbot*  
•⁠  ⁠A *Gemini API-powered chatbot* provides *basic financial advice* and answers common questions about credit cards and credit scores.  

By using this system, users can *gain better financial insights, optimize their spending, and choose the right credit card with confidence.*



## Contributors

	⁠By Group 4(JuniHers)

•⁠  ⁠Ramanu Rishita -       [f1nd1ng](https://github.com/f1nd1ng) - Developed the finance tracker feature and worked on integration.
•⁠  ⁠Kaithey Hanika Vasu -  [Hanikaaaa](https://github.com/Hanikaaaa) - Worked on the chatbot and contributed to the credit card recommendation model.
•⁠  ⁠Sonali Sharma -        [Sonali0309](https://github.com/Sonali0309) - Worked on the chatbot and contributed to the credit card recommendation model.
•⁠  ⁠Vidhi Gupta -           [vidhi-gupta45](https://github.com/vidhi-gupta45) - Developed the credit score simulator and worked on UI.
