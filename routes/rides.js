const express = require('express');
const router = express.Router();
const pool = require('../db');

// Create a new ride booking
router.post('/book',async (req, res) => {
    const {user_id, source, destination} = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO rides (user_id, source, destination)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [user_id, source, destination]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
    }
});
// Get all rides for a user
router.get('/user/:user_id', async (req, res) => {
    const {user_id} = req.params;
    try {
        const result = await pool.query(
            `SELECT * FROM rides WHERE user_id = $1`,
            [user_id]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
    }
});




module.exports = router;

