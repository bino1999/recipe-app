import { Router } from "express";
import authRouter from "./auth.routes.mjs";
import recipeRoutes from "./recipe.routes.mjs";
import userRoutes from "./user.routes.mjs";
const rootRouter = Router();

rootRouter.get("/", (req, res) => {
  res.send("Welcome to the API");
});
rootRouter.use("/auth", authRouter);
rootRouter.use("/recipe", recipeRoutes);
rootRouter.use("/users", userRoutes);

export default rootRouter;
