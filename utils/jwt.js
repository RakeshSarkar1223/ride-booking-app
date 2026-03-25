const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateToken = async (id, email, role) => {
  return jwt.sign(
    {
      id,
      email,
      role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
};

const verifyToken = async (token) => {
  return await jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
