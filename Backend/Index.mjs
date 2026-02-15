import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server Running Successfully!" });
});

app.listen(port, () => {
    console.log(`Server Running On http:localhost:${port}/`);
});
