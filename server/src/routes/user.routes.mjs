import { Router } from "express";
import User from "../models/user.model.mjs";
import { protectAuthRoute } from "../Middleware/auth.middleware.mjs";

const userRoutes = Router();

//get all users

userRoutes.get("/find-all", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {}
});

//Add to Favorites
userRoutes.post("/favorites",protectAuthRoute, async (req, res) => {
  const { id, name, image } = req.body;
  if (!id || !name || !image) {
    return res
      .status(400)
      .json({ message: "Missing recipe details in request body." });
  }
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Session may be invalid." });
    }
    const existingRecipe = user.favoriteRecipes.find(recipe => recipe.id === id);

    if (existingRecipe) {
      return res.status(409).json({ message: "This recipe is already in your favorites list." });
    }
    user.favoriteRecipes.push({ id, name, image });
    await user.save();
    res.status(201).json({
      message: "Recipe successfully added to favorites!",
      favorites: user.favoriteRecipes,
    });
  } catch (error) {
    console.error(`Error adding recipe to favorites: ${error.message}`);
    res
      .status(500)
      .json({ message: "A server error occurred while adding the recipe." });
  }
});

// Get User's Favorites

userRoutes.get("/favorites",protectAuthRoute, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please log in again." });
    }
    res.status(200).json({
      message: "Here are your favorite recipes.",
      favorites: user.favoriteRecipes,
    });
  } catch (error) {
    console.error(`Error fetching favorite recipes: ${error.message}`);
    res.status(500).json({ message: "An unexpected server error occurred." });
  }
});

// Remove from Favorites

userRoutes.delete("/favorites/:id",protectAuthRoute, async (req, res) => {
  const recipeIdToRemove = req.params.id;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const initialFavoriteCount = user.favoriteRecipes.length;
    user.favoriteRecipes = user.favoriteRecipes.filter(
      (recipe) => recipe.id !== recipeIdToRemove
    );

    if (user.favoriteRecipes.length === initialFavoriteCount) {
      return res
        .status(404)
        .json({ message: "Recipe not found in your favorites." });
    }
    await user.save();
    res.status(200).json({
      message: "Recipe successfully removed from favorites.",
      favorites: user.favoriteRecipes,
    });
  } catch (error) {
    console.error(`Error removing recipe from favorites: ${error.message}`);
    res.status(500).json({
      message: "A server error",
    });
  }
});

export default userRoutes;
