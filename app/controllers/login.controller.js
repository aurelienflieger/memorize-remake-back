import bcrypt from "bcrypt";
import UserDataMapper from "../datamappers/user.datamapper.js";
import generateJWT from "../utils/generateJWT.js";

export default async function login(req, res) {
  const { email, password } = req.body;

  const user = await UserDataMapper.getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ error: "Email is incorrect" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  const tokens = generateJWT(user);

  // Both the access oken & the refresh token are returned in JSON format for front-end authentification
  res.json(tokens);
}
