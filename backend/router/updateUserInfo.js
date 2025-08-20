import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.patch("/profile/edit", async (req, res) => {
    try {
        const { first_name, last_name, login, email, phone_number, id } = req.body;

        const [rows] = await pool.query("SELECT customerID FROM avl_customers WHERE phone_number = ?", [phone_number]);

        if (rows.length > 1) {
            return res.status(400).json({ message: "Такой номер телефона уже существует" });
        }
        const updates = { first_name, last_name, login, email, phone_number };
        const fields = Object.keys(updates).filter((key) => updates[key] !== undefined || null);
        const values = fields.map((key) => updates[key]);

        if (fields.length === 0) {
            return res.status(400).json({ message: "Нет полей к обновлению" });
        }

        const setString = fields.map((f) => `${f} = ?`).join(", ");

        await pool.query(`UPDATE avl_customers SET ${setString} WHERE customerID = ?`, [...values, id]);
        res.json({ message: `${id} пользователь с этим id изменён` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal error" });
    }
});

export default router;
