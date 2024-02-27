import "dotenv/config";
import jwt from "jsonwebtoken";

const checkForValidAuthentification = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      error:
        "No token was provided to the server: please make sure you are logged in.",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    console.log(err);
    if (err) {
      return res.status(500).json({
        error:
          "The token provided is invalid. There may be an issue with your account. Please contact support.",
      });
    }

    next();
  });
};

export default checkForValidAuthentification;
