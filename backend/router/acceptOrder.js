import express from "express";
import {pool} from '../db'

const router = express.Router();

router.post("/accept-order", async (req, res) => {
    const { first_name, last_name, payment_method, city, phone_number, newPost_office, customerID, productID } =
        req.body;
    try{
        const [added] = await pool.query(``)
    } catch(err){}
});

export default router;
