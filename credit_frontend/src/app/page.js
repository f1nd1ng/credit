import React from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    
    <Box 
  sx={{ 
    fontFamily: "Arial, sans-serif", 
    background: "#f5f5f5", 
    scrollSnapType: "y mandatory", 
    overflowX: "hidden",  // Prevent horizontal scrolling
    overflowY: "scroll", 
    height: "100vh", 
    width: "100vw",
    boxSizing: "border-box"
  }}
>

      
      {/* Hero Section */}
      <Box
  sx={{
    background: "#F5F5F5",
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    scrollSnapAlign: "start",
    flexDirection: "row", // Keep consistent with feature sections
    position: "relative",
  }}
>
  {/* Text Content */}
  <Box sx={{ width: "40vw", textAlign: "left" }}>
    <Typography
      variant="h1"
      sx={{
        position: "absolute",
        top: "22vh",
        width: "42vw",
        fontWeight: "500",
        fontSize: "7rem",
        color: "#173F35",
        left:"12vw",
      }}
    >
      Cred-It
    </Typography>
    <Typography
      variant="h4"
      sx={{
        fontSize: "3.5rem",
        color: "#6b6b6b",
        marginTop: "20px",
        position: "absolute",
        bottom: "42vh",
        width: "40vw",
        left:"12vw",
      }}
    >
      Track, Improve and Thrive - Your Finances Simplified with{" "}
      <span style={{ color: "#144542", fontWeight: "bold" }}>Cred-It</span>
    </Typography>
    <Typography
      variant="body1"
      sx={{
        marginTop: "16px",
        fontWeight: "100",
        fontSize: "1.7rem",
        color: "#000000",
        lineHeight: "1.6",
        position: "absolute",
        bottom: "19vh",
        width: "40vw",
        left:"12vw",
      }}
    >
      Manage your money smarter—track expenses, improve your credit score, and
      get the best financial recommendations, all in one place.
    </Typography>
    <Box sx={{ marginTop: 4, display: "flex", gap: 2, position: "absolute", bottom: "10vh",left:"12vw", }}>
      <Button
        variant="outlined"
        component={Link}
        href="/login"
        sx={{
          borderColor: "#144542",
          color: "#144542",
          fontSize: "1rem",
          padding: "12px 24px",
          borderRadius: "25px",
        }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        component={Link}
        href="/signup"
        sx={{
          background: "#144542",
          color: "white",
          fontSize: "1rem",
          padding: "12px 24px",
          borderRadius: "25px",
        }}
      >
        Sign-up
      </Button>
    </Box>
  </Box>
  
  {/* Image Content */}
  <Box sx={{ width: "40vw", display: "flex", justifyContent: "right", position:"absolute", bottom:"0vh",right:"0vw" }}>
    <Image
      src="/utils/credit_home.png"
      alt="Credit Cards Illustration"
      width={700}
      height={900}
    />
  </Box>
</Box>

      

      {/* Feature Sections */}
      {features.map(({ title, subtitle, description, image, link, bgColor }, index) => (
        <Box
          key={title}
          sx={{
            background: bgColor,
            width: "100vw", 
            height: "100vh", 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scrollSnapAlign: "start",
            flexDirection: index % 2 === 0 ? "row" : "row-reverse",
            position: "relative",
            paddingLeft: "1vw",
            paddingRight: "5vw",
          }}
        >
          {/* Text Content */}
          <Box sx={{ width: "40vw", textAlign: index % 2 === 0 ? "left" : "right"}}> 
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: "500", 
                fontSize: "4.7rem", 
                fontFamily: "Arial, sans-serif", 
                position: "absolute",
                top: "20vh",
                width: "40vw"
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                position: "absolute",
                fontWeight: "500", 
                fontSize: "2.5rem", 
                color: "black",
                bottom: "35vh",
                width: "40vw"
              }}
            >
              {subtitle}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                position: "absolute",
                fontWeight: "100", 
                bottom: "25vh",
                fontSize: "1.5rem", 
                width: "40vw",
                lineHeight: "1.5" // Adjusted line spacing
              }}
            >
              {description}
            </Typography>
            <Button
              variant="contained"
              component={Link}
              href={link}
              sx={{ 
                position: "absolute",
                fontWeight: "600", 
                background: "white", 
                color: "#173F35", 
                fontSize: "0.9rem", 
                ...(index % 2 === 1 ? { right: "14.5vw"} : {}),
                padding: "8px 20px", // Reduced padding
                borderRadius: "25px", 
                bottom: "15vh",
                border: "2px solid #173F35",
                minWidth: "10rem",
                '&:hover': { background: "#f0f0f0" }
              }}
            >
              Get Started
            </Button>
          </Box>
          {/* Image Content*/}
          <Box sx={{ width: "40vw", display: "flex", justifyContent: index % 2 === 1 ? "left" : "right", alignItems: index % 2 === 1 ? "left" : "right"}}>
            <Image src={image} alt={title} width={500} height={600} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

const features = [
  {
    title: "Personalised Expense Tracker",
    subtitle: "Your Money, Your Control.",
    description: "Gain full control over your expenses, track spending habits, and make smarter financial decisions effortlessly.",
    image: "/utils/tracker_home.png",
    link: "/finance_tracker",
    bgColor: "#B7E4C7"
  },
  {
    title: "Credit Score Simulator",
    subtitle: "Your Credit, Your Rules: Simulate & Improve.",
    description: "Run simulations, explore different financial choices, and take charge of your credit health.",
    image: "/utils/simulator_home.png",
    link: "/simulator",
    bgColor: "#73C69D"
  },
  {
    title: "Credit Cards Suggestion",
    subtitle: "Spend Smart, Choose Right.",
    description: "Discover the best credit cards tailored to your lifestyle and maximize your rewards.",
    image: "/utils/suggestions_home.png",
    link: "/suggestions",
    bgColor: "#52B787"
  },
  {
    title: "Chatbot: The FinAdviser",
    subtitle: "Chat. Plan. Prosper.",
    description: "Simplify your financial decisions with a chatbot that provides insights, tips, and recommendations.",
    image: "/utils/chatbot_home.png",
    link: "/chatbot",
    bgColor: "#41916C"
  }
];
