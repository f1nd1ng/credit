"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { AppBar, Toolbar, Typography, Button, Avatar, Box, Container } from "@mui/material";

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Track token changes
  const router = useRouter();

  // Fetch user details
  const fetchUser = () => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      console.log("hi")
      api.get("/api/user/me/", { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((res) => setUser(res.data))
        .catch(() => {localStorage.removeItem("access_token");setUser(null)});
    } else {
      setUser(null);
    }
  };

  // Fetch user on mount & listen for storage changes
  useEffect(() => {
    fetchUser();
    setToken(localStorage.getItem("access_token"));

    // Listen for login/logout changes
    const handleStorageChange = (event) => {
      if (event.key === "access_token") {
        setToken(event.newValue); // Update token state
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // When token changes, fetch user (without infinite reload)
  useEffect(() => {
    fetchUser();
  }, [token]); // Only runs when token changes

  // Logout function
  const handleLogout = () => {
    console.log("logout")
    localStorage.removeItem("access_token");
    setToken(null); // Triggers re-render
    router.push("/login");
  };

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflowX: "hidden", background: "#F5F5F5" }}>
        
        {/* Navbar */}
        <AppBar
          position="fixed"
          sx={{
            background: "#144542",
            zIndex: 1000,
            paddingY: 2,
            boxShadow: "none",
            width: "100vw",
            minHeight: "8vh",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              
              {/* Logo */}
              <Typography
                variant="h4"
                sx={{ fontWeight: "500", cursor: "pointer", color: "white" }}
                onClick={() => router.push("/")}
              >
                Cred It
              </Typography>

              {/* Authentication Buttons */}
              {user ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: "white", color: "#144542", fontWeight: "500", fontSize: "1.7rem", width:"3.3rem", height:"3.3rem",}}>
                    {user.username.charAt(0)}
                  </Avatar>
                  <Button
                    variant="contained"
                    sx={{
                      background: "white",
                      color: "#144542",
                      fontWeight: "bold",
                      borderRadius: "25px",
                      padding: "10px 20px",
                      '&:hover': { background: "#f0f0f0" },
                      fontSize: "1.1rem"
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    background: "white",
                    color: "#144542",
                    fontWeight: "bold",
                    borderRadius: "25px",
                    padding: "10px 24px",
                    fontSize: "1rem",
                    '&:hover': { background: "#f0f0f0" },
                  }}
                  onClick={() => router.push("/login")}
                >
                  Sign In
                </Button>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        {/* Page Content */}
        <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
          {children}
        </Box>
        
      </body>
    </html>
  );
}
