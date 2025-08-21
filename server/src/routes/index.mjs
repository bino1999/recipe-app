import { Router } from "express";
import authRouter from "./auth.routes.mjs";
import recipeRoutes from "./recipe.routes.mjs";
const rootRouter = Router();

rootRouter.get("/", (req, res) => {
  res.send("Welcome to the API");
});
rootRouter.use("/auth", authRouter);
rootRouter.use("/recipe", recipeRoutes);

export default rootRouter;
