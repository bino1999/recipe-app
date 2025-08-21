import React, { useEffect, useState } from "react";
import recipeStore from "../store/recipeStore";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Container,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import RecipeSection from "./RecipeSection";
const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getRelatedRecipe = recipeStore((state) => state.getRelatedRecipe);
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://zippy-fascination-production.up.railway.app/api/vi/recipe/all-category"
        );
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
  }, [categories, getRelatedRecipe]);
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };
  if (isLoading) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <motion.div
          variants={loadingVariants}
          animate="animate"
          style={{ display: "inline-block" }}
        >
          <Typography variant="h5">Loading categories...</Typography>
        </motion.div>
      </Container>
    );
  }
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Categories
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
          {categories.map((category) => (
            <motion.div key={category.idCategory} whileHover={{ scale: 1.1 }}>
              <Button
                onClick={() => getRelatedRecipe(category.strCategory)}
                variant="outlined"
              >
                {category.strCategory}
              </Button>
            </motion.div>
          ))}
        </Stack>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField fullWidth label="Search" variant="outlined" />
          <Button variant="contained" color="primary">
            Search
          </Button>
        </Box>
      </Box>

      <RecipeSection />
    </motion.div>
  );
};
export default CategoriesSection;
