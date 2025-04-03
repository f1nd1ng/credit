"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { Container, TextField, MenuItem, Button } from "@mui/material";
import styled from "styled-components";

const PageHeading = styled.h2`
  text-align: center;
  font-size: 3rem;
  color: #1C4332;
  font-weight: 100;
  margin-bottom: 20px;
  font-style: 'Open Sans Hebrew Condensed", sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 45px;
  margin: 40px 0;
  font-weight: 100;
  color: #1C4332;
`;

const FormGroup = styled.div`
  margin: 20px auto;
  max-width: 500px;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 10px;
    border-color: #1C4332 !important;
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: #1C4332 !important;
  }
  & .MuiInputLabel-root {
    color: #1C4332 !important;
    font-weight: 100;
  }
  & .MuiOutlinedInput-input {
    color: #1C4332 !important;
    font-weight: 100;
  }
`;

const SubmitButton = styled(Button)`
  background: #1C4332 !important;
  color: white !important;
  font-size: 18px !important;
  padding: 14px !important;
  margin-top: 20px !important;
  border-radius: 8px !important;
  &:hover {
    background: #173B27 !important;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const BackButton = styled(Button)`
  border: 2px solid #1C4332 !important;
  color: #1C4332 !important;
  font-size: 18px !important;
  padding: 14px !important;
  margin-top: 20px !important;
  border-radius: 8px !important;
  max-width: 500px;
  text-align: center;
`;

export default function CreateTransaction() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [transactionType, setTransactionType] = useState("expense");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [user, setUser] = useState(null);
  const router = useRouter();


  useEffect(() => {
    const token = localStorage.getItem("access_token");
    //Redirect after checking user login
    if (!token) {
      router.push("/login?next=finance_tracker/transactions/create");
      return;
    }

    // Fetch user data
    api
      .get("/api/user/me/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("access_token");
        setUser(null);
      });
  }, [router]);

  const handleCreateTransaction = async (e) => {
    e.preventDefault();

    // Proceed only if user is available
    if (user) {
      const transactionData = {
        amount,
        category,
        transaction_type: transactionType,
        date,
        description,
        currency,
        user: user.id,
      };

      try {
        const response = await api.post("/finance_tracker/api/transactions/", transactionData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
        router.push("/finance_tracker/transactions");
      } catch (error) {
        console.error("Error creating transaction:", error.response?.data || error.message);
      }
    } else {
      console.log("User data not available.");
    }
  };

  return (
    <Container sx={{ paddingTop: "15vh" }}>
      <form onSubmit={handleCreateTransaction}>
        <FormGroup>
          <StyledTextField
            label="Amount"
            type="number"
            fullWidth
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <StyledTextField
            select
            label="Category"
            fullWidth
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {[
              "Shopping",
              "Travel",
              "Dining",
              "Movies",
              "Fuel",
              "Food",
              "Bill Payment",
              "Stays",
              "Business Expenses",
            ].map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </StyledTextField>
          <StyledTextField
            select
            label="Type"
            fullWidth
            margin="normal"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            required
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </StyledTextField>
          <StyledTextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />
          <StyledTextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <StyledTextField
            select
            label="Currency"
            fullWidth
            margin="normal"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
          >
            {["INR", "USD", "EUR", "GBP", "JPY"].map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </StyledTextField>
          <SubmitButton type="submit" variant="contained" fullWidth>
            Submit
          </SubmitButton>
        </FormGroup>
      </form>
      <ButtonWrapper>
        <BackButton onClick={() => router.push("/transactions")} variant="outlined" fullWidth>
          Back to Transactions
        </BackButton>
      </ButtonWrapper>
    </Container>
  );
}
