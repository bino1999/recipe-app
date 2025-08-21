import { Box, Typography, Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import recipeStore from "../store/recipeStore";
import RecipeSection from "./RecipeSection";
const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getRelatedRecipe = recipeStore((state) => state.getRelatedRecipe);
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://zippy-fascination-production.up.railway.app/api/vi/recipe/all-category"
        );
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const displyInitialRecipe = () => {
      if (categories.length > 1) {
        getRelatedRecipe(categories[0].strCategory);
      }
    };
    displyInitialRecipe();
  }, [categories]);

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Categories
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          {categories.map((index) => {
            return (
              <Button
                onClick={() => getRelatedRecipe(index.strCategory)}
                key={index.idCategory}
                variant= "outlined"
              >
                {index.strCategory}
              </Button>
            );
          })}
        </Stack>

        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField fullWidth label="Search" variant="outlined" />
          <Button variant="contained" color="primary">
            Search
          </Button>
        </Box>
      </Box>

      <RecipeSection />
    </>
  );
};

export default CategoriesSection;
