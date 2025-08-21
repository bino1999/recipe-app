import { useState, useEffect } from "react";
import recipeStore from "../store/recipeStore";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: { y: 0, opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
};
const FavoriteList = () => {
  const { favList, getFavoriteRecipes, removeFavoriteRecipe, isLoading } =
    recipeStore();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {
    getFavoriteRecipes();
  }, [getFavoriteRecipes]);
  const handleRemove = async (recipeId) => {
    await removeFavoriteRecipe(recipeId);
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  if (isLoading) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5">Loading...</Typography>
      </Container>
    );
  }
  if (favList.length === 0) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5">You have no favorite recipes yet.</Typography>
      </Container>
    );
  }
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        My Favorite Recipes
      </Typography>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          <AnimatePresence>
            {favList.map((recipe) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={recipe.id}
                component={motion.div}
                variants={itemVariants}
                exit="exit"
              >
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={recipe.image}
                    alt={recipe.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="h3">
                      {recipe.name}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRemove(recipe.id)}
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Remove from Favorites
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </motion.div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Recipe successfully removed from favorites
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FavoriteList;
