import React, { useState, useEffect } from "react";
import recipeStore from "../store/recipeStore";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Link,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";

export default function RecipeSection() {
  const { recipeList, addToFavourite, getRelatedRecipe, isLoading, mainName } =recipeStore();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    getRelatedRecipe(mainName);
  }, [getRelatedRecipe, mainName]);

  const handleOpen = (recipe) => {
    setSelected(recipe);
    setOpen(true);
  };
  const handleClose = () => {
    setSelected(null);
    setOpen(false);
  };
  const buildIngredientList = (recipe) => {
    let items = [];
    for (let i = 1; i <= 20; i++) {
      const ing = recipe[`strIngredient${i}`];
      const qty = recipe[`strMeasure${i}`];
      if (ing && ing.trim()) {
        items.push(`${qty?.trim() || ""} ${ing.trim()}`.trim());
      }
    }
    return items;
  };
  const loadingVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.5, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };
  if (isLoading) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <motion.div
          variants={loadingVariants}
          animate="animate"
          style={{ display: "inline-block" }}
        >
          <Typography variant="h5">Loading...</Typography>
        </motion.div>
      </Container>
    );
  }

  if (recipeList.length === 0) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5">No recipes found for "{mainName}".</Typography>
      </Container>
    );
  }
  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {recipeList.map((recipe) => (
          <React.Fragment key={recipe.idMeal}>
            <ListItem
              button
              sx={{ width: "100%" }}
              onClick={() => handleOpen(recipe)}
            >
              <Box
                component="img"
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "8px",
                  objectFit: "cover",
                  mr: 2,
                }}
              />
              <ListItemText
                primary={recipe.strMeal}
                secondary="Click to view details"
              />
              <Button
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                variant="outlined"
                onClick={(event) => {
                  event.stopPropagation();
                  addToFavourite(
                    recipe.idMeal,
                    recipe.strMeal,
                    recipe.strMealThumb
                  );
                }}
              >
                Add to Fav
              </Button>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        {selected && (
          <>
            <DialogTitle sx={{ fontWeight: "bold" }}>
              {selected.strMeal}
            </DialogTitle>
            <DialogContent dividers>
              <Box
                component="img"
                src={selected.strMealThumb}
                alt={selected.strMeal}
                sx={{
                  width: "100%",
                  maxHeight: 300,
                  objectFit: "cover",
                  borderRadius: "8px",
                  mb: 2,
                }}
              />
              <Typography variant="subtitle1" gutterBottom>
                <strong>Category:</strong> {selected.strCategory} |{" "}
                <strong>Area:</strong> {selected.strArea}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Ingredients
              </Typography>
              <ul style={{ marginTop: 8, marginBottom: 8 }}>
                {buildIngredientList(selected).map((item, idx) => (
                  <li key={idx}>
                    <Typography variant="body2">{item}</Typography>
                  </li>
                ))}
              </ul>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Instructions
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                {selected.strInstructions}
              </Typography>
              <Box sx={{ mt: 2 }}>
                {selected.strYoutube && (
                  <Typography>
                    <Link
                      href={selected.strYoutube}
                      target="_blank"
                      rel="noopener"
                      color="primary"
                    >
                      Watch on YouTube
                    </Link>
                  </Typography>
                )}
                {selected.strSource && (
                  <Typography>
                    <Link
                      href={selected.strSource}
                      target="_blank"
                      rel="noopener"
                      color="secondary"
                    >
                      View Original Recipe
                    </Link>
                  </Typography>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
