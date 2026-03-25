const { verifyToken } = require("../utils/jwt");

const protectUser = async (req, res, next) => {

    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({"error":"Access denied. No token provided!"});
    }

  try {
    const decoded = await verifyToken(token);
    if(decoded.role !== "user"){
        return res.status(403).json({"error":"Forbidden! You don't have access to this resource."});
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({"error":"Invalid Token!"})
  }
};

const protectDriver = async (req, res, next) => {

    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({"error":"Access denied. No token provided!"});
    }
    try {
        const decoded = await verifyToken(token);
        if(decoded.role !== "driver"){
            return res.status(403).json({"error":"Forbidden! You don't have access to this resource."});
        }
        req.driver = decoded;
        next();
    } catch (error) {
        res.status(401).json({"error":"Invalid Token!"})
    }
};


module.exports = {
    protectUser,
    protectDriver
};