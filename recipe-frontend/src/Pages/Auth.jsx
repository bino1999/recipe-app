// src/App.jsx
import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import Login from './Login-page';
import Register from './Register-page';

const Auth = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          backgroundColor: 'white',
          borderRadius: 3,
          boxShadow: 3
        }}
      >
        <Typography variant="h4" component="h1" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
          Recipe App
        </Typography>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          sx={{ mb: 4 }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {activeTab === 0 && <Login onRegisterClick={() => setActiveTab(1)} />}
        {activeTab === 1 && <Register onLoginClick={() => setActiveTab(0)} />}
      </Box>
    </Box>
  );
};

export default Auth;