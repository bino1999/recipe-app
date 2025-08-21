import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("authToken");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Invalid token found:", error);
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
      }
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };
  const goToFavorites = () => {
  const token = localStorage.getItem("authToken");
  if(token){
   navigate("/fav");
  }
  else{
    alert('you need to log first ')
  }
    
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography onClick={()=>navigate("/cat")} variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Recipe App
        </Typography>
          
            <Box>
              <Button color="inherit" onClick={goToFavorites}>
                My Favorites
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
         
      </Toolbar>
    </AppBar>
  );
};
export default Header;