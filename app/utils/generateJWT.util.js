import jwt from "jsonwebtoken";

function generateJWT({ id, email }) {
  const user = { id, email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30m",
  });
  return { accessToken, refreshToken };
}

export default generateJWT;
