import express from "express";
import "dotenv/config";
import dbConnect from "./src/data/db.mjs";
import { PORT } from "./src/config/env.mjs";
import cors from "cors";
import rootRouter from "./src/routes/index.mjs";

const server = express();
server.use(express.json());

const allowedOrigins = ["http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

server.use(cors(corsOptions));
server.use(cors({ origin: "*", credentials: true }));

server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.send("Hello, World!");
});
server.use("/api/vi/", rootRouter);

dbConnect()
  .then(() => {
    console.log("Database connected successfully");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });
