import React, { useState } from "react";
import { Box, Button, TextField, Typography, Tabs, Tab, Paper } from "@mui/material";
import axios from "axios";

const API = "http://localhost:5500/api/auth";

const AuthForm = ({ onSuccess }) => {
  const [tab, setTab] = useState(0); // 0 = login, 1 = register
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = tab === 0 ? "/login" : "/register";
      const { data } = await axios.post(API + endpoint, form);

      localStorage.setItem("token", data.token);
      onSuccess(data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Paper sx={{ p: 3, width: 400, mx: "auto", mt: 4 }}>
      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: "grid", gap: 2 }}>
        {tab === 1 && (
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}

        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <Typography color="error">{error}</Typography>}

        <Button type="submit" variant="contained">
          {tab === 0 ? "Login" : "Register"}
        </Button>
      </Box>
    </Paper>
  );
};

export default AuthForm;
