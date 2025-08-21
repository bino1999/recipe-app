import React from "react";
import { Typography } from "@mui/material";
import useAuthStore from "../store/useAuthStore";


const Home = () => {
    const logginOut = useAuthStore((state) =>state.logout)
    const logout =()=>{
     logginOut()
    }
  return (
    <div>

      <Typography variant="h4">Welcome to the Dashboard! </Typography>
      <p>You have successfully logged in and can now explore recipes.</p>
      <button onClick={logout}>
        <h1>Logout</h1>
      </button>
    </div>
  );
};

export default Home;
