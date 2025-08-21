import { Router } from "express";
import axios from "axios";
import User from "../models/user.model.mjs";

const recipeRoutes = Router();
// const API_URL = 'https://www.themealdb.com/api/json/v1/1'
//
recipeRoutes.get("/", (req, res) => {
  res.status(200).send({
    msg: "this is recipie routes",
  });
});

recipeRoutes.get("/all-category", async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    res.json(response.data.categories);
  } catch (error) {
    res.send({
      msg: error,
    });
  }
});

recipeRoutes.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    res.json(response.data.meals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

recipeRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/categories.php/lookup.php?i=${id}`
    );
    res.json(response.data.meals[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// /api/user/favorites

recipeRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/categories.php/lookup.php?i=${id}`
    );
    res.json(response.data.meals[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


export default recipeRoutes;
