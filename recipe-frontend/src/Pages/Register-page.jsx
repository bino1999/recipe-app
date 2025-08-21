import React, { useState } from "react";
import { Box, TextField, Button, Link, Typography } from "@mui/material";
import axios from "axios";

const Register = ({ onLoginClick }) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios
        .post("http://localhost:4001/api/vi/auth/register", formData)
        .then(() => {
          console.log("regisstration success");
        });
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Username"
        id="userName"
        value={formData.userName}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Email"
        id="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Password"
        id="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2, py: 1.5 }}
      >
        Register
      </Button>
      <Typography variant="body2" align="center">
        Already have an account?{" "}
        <Link href="#" onClick={onLoginClick}>
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
