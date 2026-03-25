const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const {protectUser} = require("../middleware/protect");

// Create a new ride booking
router.post("/book", protectUser, async (req, res) => {
  const {source, destination } = req.body;
  const { id } = req.user;
  try {
    const result = await pool.query(
      `INSERT INTO rides (user_id, source, destination)
             VALUES ($1, $2, $3)
             RETURNING *`,
      [id, source, destination],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
  }
});
// Get all rides for a user
router.get("/user/rides",protectUser, async (req, res) => {
  const { id } = req.user;
  try {
    const result = await pool.query(`SELECT * FROM rides WHERE user_id = $1`, [
      id,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
  }
});

router.post("/api/rating", protectUser, async (req, res) => {
  const { id } = req.user;
  const { ride_id, driver_id, rating, comment } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO ratings (user_id, ride_id, driver_id, rating, comment)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
      [id, ride_id, driver_id, rating, comment],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
  }
});



module.exports = router;
