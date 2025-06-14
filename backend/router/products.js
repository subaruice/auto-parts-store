import express from "express";
import { pool } from "../db.js";
import { getProductsByCategoryId, getProductById } from "../db/queries.js";

const router = express.Router();

router.get("/category/:id", async (req, res) => {
    const categoryID = req.params.id;
    try {
        const [rows] = await pool.query(getProductsByCategoryId, [categoryID, categoryID]);
        res.json(rows);
    } catch (err) {
        console.error("DB error: ", err.message);
        res.status(500).json({ error: "Database error" });
    }
});
router.get("/product/:id", async (req, res) => {
    const productID = req.params.id;
    try {
        const [rows] = pool.query(getProductById, [productID]);
        if(rows.length === 0 ){
            return res.status(404).json({error: 'Продукт не найден'})
        }
        res.json(rows[0]);
    } catch (err) {
        console.error("DB error: ", err.message);
        res.status(500).json({ error: "Database error" });
    }
});

export default router;