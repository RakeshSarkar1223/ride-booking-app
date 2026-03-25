const pool = require("../utils/db");
const express = require("express");
const { hashPassword, comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");
const {protectUser, protectDriver} = require("../middleware/protect");


const router = express.Router();

// User registration

router.post("/register/user", async (req, res) => {
  const { name, email, phone, language, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const result = await pool.query(
      `INSERT INTO users (name, email, phone, language, password)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
      [name, email, phone, language, hashedPassword],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/register/driver", async (req, res) => {
  const { name, email, dob, location, phone, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      `INSERT INTO drivers (name, email, dob, location, phone, is_available, password)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, email, dob, location, phone, true, hashedPassword]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/login/user", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query(
      `SELECT id, email, password FROM users WHERE email = $1`,
      [email],
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = user.rows[0];

    const isValid = await comparePassword(password, userData.password);

    if (!isValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = await generateToken(userData.id, userData.email, "user");

    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: userData.id,
        email: userData.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});

router.post("/login/driver", async (req, res) => {
  const { email, password } = req.body;

  try {
    const driver = await pool.query(
      `SELECT id, email, password FROM drivers WHERE email = $1`,
      [email]
    );

    if (driver.rows.length === 0) {
      return res.status(404).json({ error: "Driver not found" });
    }

    const driverData = driver.rows[0];

    const isValid = await comparePassword(password, driverData.password);

    if (!isValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = await generateToken(driverData.id, driverData.email, "driver");

    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.status(200).json({
      message: "Driver login successful",
      driver: {
        id: driverData.id,
        email: driverData.email,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});


router.post("/logout", async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      throw new Error("Not LoggedIn!");
    }
    res.clearCookie("token", {
      httpOnly: true,
      //   secure: true,
    });

    res.status(200).json({ status: "Logout Successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/user/update", protectUser, async (req, res) => {
  const { id } = req.user;
  let { name, phone, language } = req.body;
  try {
    const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    name = name || user.rows[0].name;
    phone = phone || user.rows[0].phone;
    language = language || user.rows[0].language;

    const result = await pool.query(
      `UPDATE users SET name = $1, phone = $2, language = $3 WHERE id = $4 RETURNING *`,
      [name, phone, language, id],
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.patch("/driver/update", protectDriver, async (req, res) => {
  const { id } = req.driver;
  let { name, phone, location } = req.body;

  try {
    const driver = await pool.query(
      `SELECT name, phone, location FROM drivers WHERE id = $1`,
      [id]
    );

    if (driver.rows.length === 0) {
      return res.status(404).json({ error: "Driver not found" });
    }

    const existingDriver = driver.rows[0];

    name = name ?? existingDriver.name;
    phone = phone ?? existingDriver.phone;
    location = location ?? existingDriver.location;

    const result = await pool.query(
      `UPDATE drivers 
       SET name = $1, phone = $2, location = $3 
       WHERE id = $4 
       RETURNING id, name, email, phone, location, is_available`,
      [name, phone, location, id]
    );

    res.status(200).json({
      message: "Driver updated successfully",
      driver: result.rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/user/update/password", protectUser, async (req, res) => {
  const { id } = req.user;
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await pool.query(`SELECT password FROM users WHERE id = $1`, [
      id,
    ]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const isValid = await comparePassword(oldPassword, user.rows[0].password);

    if (!isValid) {
      return res.status(400).json({ error: "Incorrect old Password!!" });
      
    }
    const hashedPassword = await hashPassword(newPassword);
    const result = await pool.query(
      `UPDATE users SET password = $1 WHERE id = $2 RETURNING *`,
      [hashedPassword, id],
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/driver/update/password", protectDriver, async (req, res) => {
  const { id } = req.driver;
  const { oldPassword, newPassword } = req.body;

  try {
    const driver = await pool.query(
      `SELECT password FROM drivers WHERE id = $1`,
      [id]
    );

    if (driver.rows.length === 0) {
      return res.status(404).json({ error: "Driver not found" });
    }

    const isValid = await comparePassword(
      oldPassword,
      driver.rows[0].password
    );

    if (!isValid) {
      return res.status(400).json({ error: "Incorrect old password" });
    }

    const hashedPassword = await hashPassword(newPassword);

    await pool.query(
      `UPDATE drivers SET password = $1 WHERE id = $2`,
      [hashedPassword, id]
    );

    res.status(200).json({
      message: "Password updated successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
