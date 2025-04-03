"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TextField, Button, Typography, Box, Paper, Divider } from "@mui/material";
import Image from "next/image";
import { baseURL } from "@/utils/api";

export default function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("next") || "/";

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      router.replace(redirectTo);
    }
  }, [redirectTo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(baseURL("/login/"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email_or_username: emailOrUsername, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      router.replace(redirectTo);
    } else {
      console.error("Login failed:", data);
    }
  };

  useEffect(() => {
    window.google?.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleLogin,
    });

    window.google?.accounts.id.renderButton(
      document.getElementById("google-login-button"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleGoogleLogin = (response) => {
    const googleToken = response.credential;
    fetch(baseURL("/auth/google/"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: googleToken }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access) {
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          router.replace(redirectTo);
        } else {
          console.error("Google Login failed:", data);
        }
      });
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", bgcolor: "#f5f5f5" }}>
      <Paper elevation={6} sx={{ display: "flex", width: "100vw", maxWidth: 1000, borderRadius: 4, overflow: "hidden", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)" }}>
        {/* Left Side - Illustration */}
          <Image src="/utils/login.png" alt="Login Illustration" width={550} height={550} />
        

        {/* Right Side - Login Form */}
        <Box sx={{ width: "50%", padding: 5, display: "flex", flexDirection: "column", alignItems: "center", bgcolor: "white" }}>
          <Typography variant="h4" color="#144542" fontWeight="bold" mb={4} sx={{ fontSize: "2.5rem" }}>Sign In</Typography>

          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <TextField
              label="Email or Username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ fontSize: "1.2rem", '& .MuiInputBase-root': { fontSize: "1.2rem", height: "50px" } }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ fontSize: "1.2rem", '& .MuiInputBase-root': { fontSize: "1.2rem", height: "50px" } }}
            />

            <Button 
              type="submit"
              variant="contained" 
              fullWidth 
              sx={{ mt: 3, backgroundColor: "#144542", fontSize: "1.3rem", padding: "1rem", '&:hover': { backgroundColor: "#0e332f" } }}
            >
              Login
            </Button>
          </form>

          <Typography variant="body2" sx={{ mt: 2, fontSize: "1.1rem", color: "#144542" }}>Forgot password?</Typography>
          
          <Divider sx={{ width: "100%", my: 2 }} />

          {/* Google Sign-In Button */}
          <Box id="google-login-button" sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}></Box>

          <Typography variant="body2" sx={{ mt: 2, fontSize: "1.1rem", color: "#144542" }}>
            Don’t have an account? <a href="/signup" style={{ color: "#144542", fontWeight:"bold" }}>Sign up</a>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
