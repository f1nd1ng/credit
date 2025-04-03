"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { Container, Button, Typography, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function FinanceTracker() {''
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    //Redirect after user logs in
    if (!token) {
      router.push("/login?next=finance_tracker");
      return;
    }
  }, []);

  return (

    <Box 
      sx={{ 
        fontFamily: "Arial, sans-serif", 
        backgroundColor: "#1C4332", 
        scrollSnapType: "y mandatory", 
        overflowX: "hidden",  
        overflowY: "scroll", 
        height: "100vh", 
        width: "100vw",
        boxSizing: "border-box"
      }}
    >

    <Box
    sx={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      scrollSnapAlign: "start",
      flexDirection: "row", 
      position: "relative",
    }}
  >
    {/* Text Content */}
    <Box sx={{ width: "40vw", textAlign: "left" }}>
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          bottom: "25vh",
          width: "42vw",
          fontWeight: "600",
          fontSize: "5rem",
          color: "white",
          left:"12vw",
        }}
      >
        Finance Tracker
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontSize: "2rem",
          fontWeight: "100",
          color: "white",
          marginTop: "20px",
          position: "absolute",
          bottom: "35vh",
          width: "40vw",
          left:"12vw",
        }}
      >
        Manage Money Like a Pro with our
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginTop: "16px",
          fontWeight: "600",
          fontSize: "3.8rem",
          color: "white",
          lineHeight: "1.3",
          position: "absolute",
          top: "20vh",
          width: "40vw",
          left:"12vw",
        }}
      >
        <span style={{ color: "#73C69D"}}>Optimise</span> the management of your <span style={{ color: "#73C69D"}}>Finances</span> 
      </Typography>
      <Box sx={{ marginTop: 4, display: "flex", gap: 2, position: "absolute", bottom: "15vh",left:"12vw", }}>
        <Button
          variant="outlined"
          component={Link}
          href="/finance_tracker/transactions"
          sx={{
            color: "black",
            fontSize: "1rem",
            fontWeight: "600",
            padding: "12px 24px",
            borderRadius: "25px",
            background: "#73C69D",
          }}
        >
          View Transactions
        </Button>
        <Button
          variant="contained"
          component={Link}
          href="/finance_tracker/transactions/create"
          sx={{
            background: "#73C69D",
            color: "black",
            fontWeight: "600",
            fontSize: "1rem",
            padding: "12px 24px",
            borderRadius: "25px",
          }}
        >
          Create Transactions
        </Button>
      </Box>
    </Box>
    
    {/* Image Content */}
    <Box sx={{ width: "40vw", display: "flex", justifyContent: "right", position:"absolute", bottom:"0vh",right:"5vw" }}>
      <Image
        src="/utils/tracker_page_side.png"
        alt="Credit Cards Illustration"
        width={900}
        height={1000}
      />
    </Box>
  </Box>
  </Box>
  );
}
