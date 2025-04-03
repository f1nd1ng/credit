"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Typography, Box, Paper, Divider } from "@mui/material";
import Image from "next/image";
import { baseURL } from "@/utils/api";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    //Google Authentication
    const loadGoogleScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = renderGoogleButton;
        document.body.appendChild(script);
      } else {
        renderGoogleButton();
      }
    };

    const renderGoogleButton = () => {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleSignup,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signup-btn"),
        { theme: "outline", size: "large" }
      );
    };

    loadGoogleScript();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch(baseURL("/signup/"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });

    const data = await res.json();
    if (data.access) {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      router.replace("/");
    } else {
      alert(data.error || "Signup failed!");
    }
  };

  const handleGoogleSignup = async (response) => {
    if (!response.credential) {
      console.error("No Google token received!");
      return;
    }

    const tokenPayload = { token: response.credential };

    const res = await fetch(baseURL("/auth/google/"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tokenPayload),
    });

    const data = await res.json();
  
    if (res.ok) {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      alert("Google Signup Successful!");
      window.location.href = "/dashboard";
    } else {
      alert("Google Signup failed: " + (data.error || "Unknown error"));
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", bgcolor: "#f5f5f5" }}>
          <Paper elevation={6} sx={{ display: "flex", width: "100vw", maxWidth: 1000, borderRadius: 4, overflow: "hidden", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)" }}>
            {/* Left Side - Illustration */}
              <Image src="/utils/login.png" alt="Login Illustration" width={550} height={550} />

        {/* Right Side - Signup Form */}
        <Box sx={{ width: "50%", padding: 5, display: "flex", flexDirection: "column", alignItems: "center", bgcolor: "white" }}>
          <Typography variant="h4" color="#144542" fontWeight="bold" mb={4} sx={{ fontSize: "2.5rem" }}>Sign Up</Typography>

          <form onSubmit={handleSignup} style={{ width: "100%" }}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ fontSize: "1.3rem", '& .MuiInputBase-root': { fontSize: "1.3rem", height: "50px" } }}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ fontSize: "1.3rem", '& .MuiInputBase-root': { fontSize: "1.3rem", height: "50px" } }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ fontSize: "1.3rem", '& .MuiInputBase-root': { fontSize: "1.3rem", height: "50px" } }}
            />

            <Button 
              type="submit"
              variant="contained" 
              fullWidth 
              sx={{ mt: 3, backgroundColor: "#144542", fontSize: "1.4rem", padding: "1.2rem", '&:hover': { backgroundColor: "#0e332f" } }}
            >
              Sign Up
            </Button>
          </form>

          <Typography variant="body2" sx={{ mt: 2, fontSize: "1.2rem", color: "#144542" }}>Already have an account? <a href="/login" style={{ color: "#144542", fontWeight:"bold" }}>Log in</a></Typography>
          
          <Divider sx={{ width: "100%", my: 3 }} />

          {/* Google Sign-Up Button */}
          <Box id="google-signup-btn" sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}></Box>
        </Box>
      </Paper>
    </Box>
  );
}
