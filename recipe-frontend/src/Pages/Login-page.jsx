import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Link,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Login = ({ onRegisterClick }) => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  //   const logOut = useAuthStore((state)=>state.logout)
  //   const val = useAuthStore((state)=>state.isAuthenticated)

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    open: false,
    message: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({ open: false, message: "" });

    try {
      const response = await axios.post(
        "http://localhost:4001/api/vi/auth/login",
        formData
      );

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        login(response.data.token);
        navigate("/Home");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError({
        open: true,
        message:
          error.response?.data?.message ||
          "Login failed. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Email"
          type="email"
          fullWidth
          id="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          id="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, py: 1.5 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Log in"}
        </Button>
        
        <Typography variant="body2" align="center">
          Don't have an account?{" "}
          <Link href="#" onClick={onRegisterClick}>
            Register
          </Link>
        </Typography>
      </Box>

      <Snackbar
        open={error.open}
        autoHideDuration={4000}
        onClose={() => setError({ ...error, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={() => setError({ ...error, open: false })}
        >
          {error.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
