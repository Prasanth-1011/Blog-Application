import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import Database from "./Database.mjs";
import AuthRoutes from "./Routes/Auth.mjs";
import PostRoutes from "./Routes/Post.mjs";

dotenv.config();
const app = express();
const port = process.env.PORT;

Database();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server Running Successfully!" });
});

app.use("/api", AuthRoutes);
app.use("/api/posts", PostRoutes);

app.listen(port, () => {
    console.log(`Server Running On http:localhost:${port}/`);
});
