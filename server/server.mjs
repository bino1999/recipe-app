import express from "express";
import "dotenv/config";
import dbConnect from "./src/data/db.mjs";
import cors from "cors";
import rootRouter from "./src/routes/index.mjs";

const server = express();
server.use(express.json());
const port = process.env.PORT || 4001;
const corsOptions ={
    origin:['http://localhost:5173','https://recipe-app-five-murex-86.vercel.app' ],
    credentials:true,            
    optionSuccessStatus:200
}
server.use(cors(corsOptions))
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.send("Hello, World!");
});
server.use("/api/vi/", rootRouter);

dbConnect()
  .then(() => {
    console.log("Database connected successfully");
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });
