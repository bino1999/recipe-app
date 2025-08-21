import { create } from "zustand";
import axios from "axios";

const recipeStore = create((set) => ({
  mainName: "Beef",
  recipeList: [],
  favList: [],
  isLoading: false,

  getRelatedRecipe: async (categoryName) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        `https://zippy-fascination-production.up.railway.app/api/vi/recipe/search?query=${categoryName}`
      );
      try {
        if (response.data.length > 1) {
          set({ recipeList: response.data, mainName: categoryName });
        } else {
          set({ recipeList: [] });
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Failed to fetch related recipes:", error);
      set({ recipeList: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  setFavouriteList: async (id, rname, image) => {
    const token = localStorage.getItem("authToken");
    const fav = {
      id: id,
      name: rname,
      image: image,
    };
    try {
      const response = await axios.post(
        "https://zippy-fascination-production.up.railway.app/api/vi/users/favorites",
        fav,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ favList: response.data });
    } catch (error) {
      console.error("Failed to fetch related recipes:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getFavoriteRecipes: async () => {
    set({ isLoading: true });
    const token = localStorage.getItem("authToken");
    if (!token) {
      set({ favList: [], isLoading: false });
      return;
    }

    try {
      const response = await axios.get(
        "https://zippy-fascination-production.up.railway.app/api/vi/users/favorites",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ favList: response.data.favorites });
    } catch (error) {
      console.error("Failed to fetch favorite recipes:", error);
      set({ favList: [] });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default recipeStore;
