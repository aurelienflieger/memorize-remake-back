import bcrypt from "bcrypt";
import signupDatamapper from "../datamappers/signup.datamapper.js";

const signupController = {
  signup: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await signupDatamapper.newUser(name, email, hashedPassword)
      res.json({ newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default signupController;