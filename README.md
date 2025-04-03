# Cred-It

Cred-It is a financial management platform designed to help users track their credit scores, manage transactions, and analyze financial data.

## Features

- **User Authentication**: Sign up and log in using email, username, password, or Google OAuth.
- **Credit Score Simulator**: Enter financial details to calculate an estimated credit score.
- **Transaction Management**: Add, view, and filter transactions by daily, weekly, monthly, or yearly views.
- **Centralized Authentication**: Integrated with the Finance Tracker app using a shared authentication system.
- **Secure API**: Backend supports authentication via tokens and handles financial data securely.

## Setup Instructions

### Backend Setup (credit/)
1. Navigate to the backend directory:
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
6. Run database migrations:
   ```sh
   python manage.py migrate
   ```
7. Start the development server:
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
3. Start the frontend development server:
   ```sh
   npm run dev
   ```

## Usage
- Open the frontend at `http://localhost:3000/` to access the application.
- Use the authentication system to log in or sign up.
- Navigate to the transactions section to add and view transactions.
- Use the credit score simulator to estimate your credit score.