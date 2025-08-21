import { useEffect } from "react";
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
} from "@mui/material";

const FavoriteList = () => {
  const { favList, getFavoriteRecipes, removeFavoriteRecipe, isLoading } =recipeStore();
  useEffect(() => {
    getFavoriteRecipes();
  }, [getFavoriteRecipes]);
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
      <Grid container spacing={3}>
        {favList.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
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
                  onClick={() => removeFavoriteRecipe(recipe.id)}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Remove from Favorites
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FavoriteList;
