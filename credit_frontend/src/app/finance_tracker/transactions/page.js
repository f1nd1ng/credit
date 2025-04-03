"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function FinanceTracker() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login?next=finance_tracker/transactions/");
      return;
    }

    // Modify the API endpoint to handle 'All' filter
    const endpoint =
      filter === "all"
        ? "/finance_tracker/api/transactions/"
        : `/finance_tracker/api/transactions/filter/?filter=${filter}`;

    api
      .get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setTransactions(response.data))
      .catch((error) =>
        console.log("Error fetching transactions:", error.response?.data || error.message)
      );
  }, [filter]);

  const categoryData = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + parseFloat(tx.amount);
    return acc;
  }, {});

  const pieCategoryData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

  const income = transactions
    .filter((tx) => tx.transaction_type === "income")
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
  const expense = transactions
    .filter((tx) => tx.transaction_type === "expense")
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
  const savings = income - expense;

  const pieSavingsData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
    { name: "Savings", value: savings },
  ];

  const COLORS = ["#0B5345", "#148F77", "#1ABC9C", "#2ECC71", "#58D68D"];

  return (
    <div style={{ height: "100vh", overflowY: "auto", paddingTop: "10vh" }}>
      <Container
        sx={{
          mt: 4,
          paddingX: "8vw",
          height: "calc(100vh - 5vh)", 
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 500, color: "#1C4332", fontSize: "3rem" }}
        >
          Track your Expenses
        </Typography>

        {/* Controls Section (Without Border) */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              px: 4,
              py: 1.7,
              fontSize: "1.2rem",
              bgcolor: "#1C4332",
              borderRadius: "1.5rem",
              "&:hover": { bgcolor: "#173B27" },
            }}
            onClick={() => router.push("/finance_tracker/transactions/create")}
          >
            Add Transaction
          </Button>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{
              fontSize: "1.2rem",
              textTransform: "none",
              px: 4,
              py: 0.5,
              border: "0.1rem solid #1C4332",
              borderRadius: "1.5rem",
              color: "#1C4332",
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </Box>

        {/* Transactions Table (Larger & More Readable) */}
        <TableContainer component={Paper} sx={{ border: "1px solid #1C4332", borderRadius: "8px" }}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 100, color: "#1C4332", fontSize: "1.2rem", borderBottom: "1px solid #1C4332" }}>
                  Transaction Name
                </TableCell>
                <TableCell sx={{ fontWeight: 100, color: "#1C4332", fontSize: "1.2rem", borderBottom: "1px solid #1C4332" }}>
                  Amount
                </TableCell>
                <TableCell sx={{ fontWeight: 100, color: "#1C4332", fontSize: "1.2rem", borderBottom: "1px solid #1C4332" }}>
                  Date of Transaction
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell sx={{ borderBottom: "1px solid #1C4332", fontSize: "1.1rem" }}>
                      {tx.category}
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #1C4332", fontSize: "1.1rem" }}>
                      {tx.amount} {tx.currency}
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #1C4332", fontSize: "1.1rem" }}>
                      {tx.date}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ fontSize: "1.1rem" }}>
                    No transactions available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Charts Section */}
        <Grid container spacing={4} sx={{ mt: 4, justifyContent: "center", alignItems: "center" }}>
          {pieCategoryData.length > 0 && (
            <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 100, color: "#1C4332", fontSize: "1.5rem" }}>
                Category-wise Expenses
              </Typography>
              <PieChart width={400} height={320}>
                <Pie data={pieCategoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} fill="#27AE60" label>
                  {pieCategoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Grid>
          )}

          {pieSavingsData.length > 0 && (
            <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 100, color: "#1C4332", fontSize: "1.5rem" }}>
                Income vs Expenses vs Savings
              </Typography>
              <PieChart width={400} height={320}>
                <Pie data={pieSavingsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} fill="#2ECC71" label>
                  {pieSavingsData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Grid>
          )}
        </Grid>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </Container>

      
    </div>
  );
}
