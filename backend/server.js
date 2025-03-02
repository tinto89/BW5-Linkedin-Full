import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";

import { router as userRouter } from "./routes/routes.js";

const server = express();

server.use(express.json());
server.use(cors());
connectDB();

const port = 3001;

server.get("/", (req, res) => {
  res.send("Linkedin backend");
});

server.use("/api/users", userRouter);
server.use("/uploads", express.static("uploads"));

server.listen(port, () => {
  console.log(`Server in funzione sulla porta ${port}`);
});
