"use client";
import { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseURL } from "@/utils/api";

export default function Chatbot() {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    //Redirect after checking if the user is logged in
    if (!token) {
      router.push("/login?next=chatbot/");
      return;
    }
  }, []);

  const [messages, setMessages] = useState([
    { text: "Hi there! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.post(baseURL("/chatbot/"), { message: input }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const botMessage = { sender: "bot", text: res.data.reply.replace(/\n/g, "<br/>").replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (err) {
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "Error getting response" }]);
    }
    setInput("");
  };

  return (
    <Container sx={{ mt: 4, fontFamily: 'Open Sans, sans-serif', paddingTop: "20vh", maxWidth: "40vw", maxHeight:"50vh" }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: "16px", backgroundColor: "#ffffff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Typography variant="h5" fontWeight="600" sx={{ textAlign: "center", mb: 3, fontFamily: "'Open Sans', sans-serif", color: "#1C4332", fontSize: "2.5rem" }}>
          Chatbot
        </Typography>
        <Box sx={{
          height: 300,
          overflowY: "auto",
          p: 2,
          borderRadius: 2,
          backgroundColor: "#F3F3F3",
          boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
        }}>
          {messages.map((msg, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: "1.5rem",
                fontFamily: "'Open Sans', sans-serif",
                textAlign: msg.sender === "user" ? "right" : "left",
                my: 1,
                color: msg.sender === "user" ? "white" : "#144542",
                backgroundColor: msg.sender === "user" ? "#1C4332" : "transparent", 
                padding: msg.sender === "user" ? "0.8rem 1.5rem" : "0", 
                borderRadius: "20px", 
                maxWidth: "70%", 
                marginLeft: msg.sender === "user" ? "auto" : "0", 
              }}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          ))}
        </Box>
        <Box sx={{ display: "flex", mt: 2 }}>
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            variant="outlined"
            sx={{
              borderRadius: "1.5rem",
              bgcolor: "#F9F9F9",
              '& .MuiOutlinedInput-root': {
                borderRadius: "1.5rem",
                '&.Mui-focused fieldset': {
                  borderColor: "#1C4332",
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            sx={{
              ml: 2,
              bgcolor: "#1C4332",
              borderRadius: "1.5rem",
              textTransform: "none",
              width: "7rem",
              fontSize: "1.3rem",
              '&:hover': { bgcolor: "#173B27" },
            }}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
