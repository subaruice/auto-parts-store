import express from "express";
import mongoose from "mongoose";

const PORT = 5000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    console.log(req.query);

    res.status(200).json("Сервер работает");
});

app.listen(PORT, () => console.log(`сервер был запущен на ${PORT} порту`));
