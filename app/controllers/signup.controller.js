import bcrypt from "bcrypt";
import signupDatamapper from "../datamappers/signup.datamapper.js";

async function signup(req, res) {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await signupDatamapper.newUser(
    username,
    email,
    hashedPassword
  );
  res.json({ newUser });
}

export default signup;
