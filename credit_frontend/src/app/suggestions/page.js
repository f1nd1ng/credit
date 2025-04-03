"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { baseURL } from "@/utils/api";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Button,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";


const FirstPage = () => (
  <Box
    sx={{
      backgroundImage: 'url("/utils/suggestions_page.png")', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat', 
      color: "white",
      py: 6,
      px: 3,
      textAlign: "center",
      minHeight: "80vh", 
      paddingTop: "16vh",
      fontFamily: "'Open Sans', sans-serif", 
    }}
  >
    <Container>

      <Typography variant="h4" fontWeight="500" fontSize="5rem" sx={{ mb: 1 }}>
        Credit Cards Suggestion
      </Typography>
      <Typography variant="h6" mt={1} fontSize="3rem">
        Better <span style={{ color: "#1C4332" }}>Cards</span>, Best{" "}
        <span style={{ color: "#86efac" }}>Benefits</span>!
      </Typography>
      <Typography
        variant="body1"
        fontSize="1.5rem"
        fontWeight="100"
        sx={{ maxWidth: 800, mx: "auto", mt: 2, color: "#e0f2f1", paddingTop:"3rem" }}
      >
        Find the perfect credit card tailored to your spending habits. Get
        personalized recommendations based on your lifestyle and maximize your
        rewards!
      </Typography>

      
    </Container>
  </Box>
);


const SecondPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCards = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        router.push("/login?next=/suggestions");
        return;
      }

      try {
        const response = await fetch(
          baseURL("suggestions/api/top_cards?salaried=true"),
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        setCards(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching cards:", error);
        setError("Failed to load card suggestions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return (
    <Container
      sx={{
        textAlign: "center",
        py: 6,
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      <Typography variant="h5" fontWeight="500"paddingBottom="2rem" fontSize="3rem" color="#134e4a" mb={4}>
        Find Your Best Cards Here
      </Typography>

      {loading ? (
        <CircularProgress sx={{ mt: 3 }} />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : cards.length > 0 ? (
        <Grid container spacing={10} justifyContent="center">
          {cards.map((card, index) => (
            <Grid item key={index} xs={1} sm={2} md={2}>
              <Paper
                elevation={12} 
                sx={{
                  backgroundColor: "#d1fae5",
                  borderRadius: "12px",
                  textAlign: "left",
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)", 
                  height: "100%",
                  width: "30vw",
                }}
              >
                {/* Card Header */}
                <Box
                  sx={{
                    backgroundColor: "#134e4a",
                    color: "white",
                    textAlign: "center",
                    py: 2,
                    paddingLeft:"2rem",
                    paddingRight:"2rem",
                    paddingTop:"1rem",
                    paddingBottom:"1rem",
                    borderRadius: "12px",
                    fontWeight: "500",
                    mb: 3, 
                    fontSize: "1.5rem",
                  }}
                >
                  {card["Card Name"] || "Name of The Card"}
                </Box>
                
                <Box sx={{marginLeft:"2rem",marginBottom:"2rem"}}>
                {/* Card Details */}
                <Typography variant="body2" sx={{ mb: 1, fontSize: "1.2rem", color:"#1C4332"}}>
                  <strong>Bank:</strong> {card["Bank Name"] || "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, fontSize: "1.2rem", color:"#1C4332"}}>
                  <strong>Joining Fee:</strong> Rs.{" "}
                  {card["Joining Fee"] ?? "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, fontSize: "1.2rem",color:"#1C4332" }}>
                  <strong>Renewal Fee:</strong> Rs.{" "}
                  {card["Renewal Fee"] ?? "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, fontSize: "1.2rem", color:"#1C4332"}}>
                  <strong>Minimum Income:</strong> Rs.{" "}
                  {card["Minimum Salaried Income"] || "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, fontSize: "1.2rem",color:"#1C4332" }}>
                  <strong>Annual Fee Waiver:</strong> Rs.{" "}
                  {card["annual fee waiver"] || "N/A"}
                </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="gray" sx={{ mt: 3 }}>
          No cards available at the moment.
        </Typography>
      )}
    </Container>
  );
};

export default function CreditCardsPage() {
  return (
    <div style={{ overflowY: "auto", height: "100vh", fontFamily: "'Open Sans', sans-serif" }}>
      <FirstPage />
      <SecondPage />
    </div>
  );
}
