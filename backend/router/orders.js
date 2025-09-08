import express from 'express';

const router = express.Router();

router.get('/orders', (req, res) => {
    const {first_name, last_name, customerID, city, payment_method, newPost_office, phone_number} = req.body
    
})

export default router;