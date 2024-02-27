import "dotenv/config";
import jwt from "jsonwebtoken";
import generateJWT from "../utils/generateJWT.util.js";

const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

const checkForValidAuthentification = async (req, res, next) => {
  const accessToken = JSON.parse(req.headers["authorization"].split(" ")[1]);
  const refreshToken = JSON.parse(req.headers["x-refresh-token"]);

  console.log(`checkForValidAuth / token: ${accessToken}`);
  console.log(`checkForValidAuth / refreshToken: ${refreshToken}`);

  if (!accessToken && !refreshToken) {
    return res.status(403).json({
      error:
        "No token was provided to the server: please make sure you are logged in.",
    });
  }

  try {
    const decoded = await verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log("Decoded token - checkForValidAuthentification");
    console.log(decoded);
    next();
  } catch (err) {
    if (refreshToken) {
      try {
        const decoded = await verifyToken(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          generateJWT(decoded);
        res.setHeader(
          "authorization",
          `Bearer: ${JSON.stringify(newAccessToken)}`
        );
        res.setHeader("x-refresh-token", newRefreshToken);

        console.log("New tokens issued - checkForValidAuthentification");
        console.log(newAccessToken);
        console.log(newRefreshToken);

        next();
      } catch (err) {
        return res.status(500).json({
          error:
            "The refresh token provided is invalid. There may be an issue with your account. Please contact support.",
        });
      }
    } else {
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {

    if (err) {
      return res.status(500).json({
        error:
          "The token provided is invalid. There may be an issue with your account. Please contact support.",
      });
    }
  }
    next();
  });
};

export default checkForValidAuthentification;
