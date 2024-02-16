import bcrypt from "bcrypt";
import UserDataMapper from "../datamappers/user.datamapper.js";
import generateJWT from "../utils/generateJWT.js";

export default async function signup(req, res) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = await UserDataMapper.createUser(
    req.body.username,
    req.body.email,
    hashedPassword
  );

  // Both the access oken & the refresh token are returned in JSON format for front-end authentification
  res.json(generateJWT(newUser));
}
