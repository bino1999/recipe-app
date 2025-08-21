import React, { useState } from "react";
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
} from "@mui/material";
import {jwtDecode} from "jwt-decode";

export default function RecipeSection() {
  const recipeList = recipeStore((state) => state.recipeList);
  const addToFavourite = recipeStore((state) => state.setFavouriteList); 
  const listOfFav = recipeStore((state) => state.favList);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
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
              <Button variant="outlined" onClick={()=>addToFavourite(recipe.idMeal ,recipe.strMeal ,recipe.strMealThumb  )}>
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
