import { create } from "zustand";
import axios from "axios";

const recipeStore = create((set) => ({
  mainName: "Beef",
  recipeList: [],
  isLoading: false,

  getRelatedRecipe: async (categoryName) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        `http://localhost:4001/api/vi/recipe/search?query=${categoryName}`
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
}));

export default recipeStore;
