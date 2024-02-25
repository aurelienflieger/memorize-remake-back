import bcrypt from "bcrypt";
import generateJWT from "../utils/generateJWT.util.js";
import CoreController from "./core.controller.js";
import { UserDataMapper } from "../datamappers/index.datamapper.js";
import ApiError from "../errors/api.error.js";
import { createFailedCreationError, createFailedUpdateError, createMissingIdError, createMissingParamsError, createResourceNotFoundError, createUpdateNotModifiedError } from "../errors/helpers.error.js";

class UserController extends CoreController {
  constructor() {
    const datamapper = new UserDataMapper();

    super(datamapper);

    this.datamapper = datamapper;
  }

  login = async (req, res) => {
    const { email: inputEmail, password: inputPassword } = req.body;

    if (!inputEmail || !inputPassword) {
      throw createMissingParamsError(req, {entityName: "user", params: ["email", "password"]});
    }

    const user = await this.datamapper.getUserByEmail(inputEmail);

    if (!user) {
      throw createResourceNotFoundError(req, {entityName: "user", targetName: "user"});  
    }

    const validPassword = await bcrypt.compare(inputPassword, user.password);

    if (!validPassword) {
      throw new ApiError(
        "The password provided is incorrect.", 
        {
          httpStatus: 401, 
          errorCode: "INCORRECT_PASSWORD", 
          path: req.path, 
          method: req.method, 
          details: "A valid password must be provided to the server. \n Please check your password to process your login request."
        }
      );
    }

    const tokens = generateJWT(user);

    if (!tokens) {
      throw new ApiError(
        "The authentication tokens could not be generated.", 
        {
          httpStatus: 500, 
          errorCode: "TOKENS_ERROR", 
          path: req.path, 
          method: req.method, 
          details: "The access & refresh tokens failed to generate although the information provided was valid. This is an internal server error."
        }
      );
    }

    const { email, username, id } = user;

    const tokensWithUser = {
      ...tokens,
      email,
      username,
      id,
    };

    res.status(200).json(tokensWithUser);
  };

  signup = async (req, res) => {
    const { password, username, email } = req.body;

    if (!password || !username || !email) {
      throw createMissingParamsError(req, {entityName: "user", params: ["username", "email", "password"]});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      throw new ApiError(
        "The password could not be encrypted.", 
        {
          httpStatus: 500, 
          errorCode: "ENCRYPTION_FAILED", 
          path: req.path, 
          method: req.method, 
          details: "The password could not be encrypted although the information provided was valid. This is an internal server error."
        }
      );
    }

    const newUser = await this.datamapper.insert({
      email,
      username,
      password: hashedPassword,
    });

    if (!newUser) {
      throw createFailedCreationError(req, {entityName: "user"});
    }

    res.status(201).json({ newUser });
  };

  updateAccountInfo = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      throw createMissingIdError(req, {entityName : "user"});
    }

    let { username, email } = req.body;
    const accountMatchingId = await this.datamapper.findByPk(id);

    if (!accountMatchingId) {
      throw createResourceNotFoundError(req, {entityName: "user", targetName: "user"});
    }

    username ? username : (username = accountMatchingId.username);
    email ? email : (email = accountMatchingId.email);

    const isNotModified = accountMatchingId.username === username && accountMatchingId.email === email;

    if (isNotModified) {
      throw createUpdateNotModifiedError(req, {entityName: "user"});
    }

    const updatedAccountInfo = { ...accountMatchingId, email: email, username: username };

    const updatedAccount = await this.datamapper.update(updatedAccountInfo);

    if (!updatedAccount) {
      throw createFailedUpdateError(req, {entityName: "user"});
    }

    return res.status(200).json(updatedAccount);
  };

  updateAccountPassword = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      throw createMissingIdError(req, {entityName : "user"});
    }

    let { password, newPassword } = req.body;

    const accountMatchingId = await this.datamapper.findByPk(id);

    if (!accountMatchingId) {
      throw createResourceNotFoundError(req, {entityName: "user", targetName: "user"});
    }

    const validPassword = await bcrypt.compare(password, accountMatchingId.password);

    if (!validPassword) {
      throw new ApiError(
        "The password provided is incorrect.", 
        {
          httpStatus: 401, 
          errorCode: "INCORRECT_PASSWORD", 
          path: req.path, 
          method: req.method, 
          details: "A valid password must be provided to the server. \n Please check your password to process your login request."
        }
      );
    }

    const updatedHashedPassword = await bcrypt.hash(newPassword, 10);

    if (!updatedHashedPassword) {
      throw new ApiError(
        "The password could not be encrypted.", 
        {
          httpStatus: 500, 
          errorCode: "ENCRYPTION_FAILED", 
          path: req.path, 
          method: req.method, 
          details: "The password could not be encrypted although the information provided was valid. This is an internal server error."
        }
      );
    }

    const comparePasswords = await bcrypt.compare(newPassword, accountMatchingId.password);

    if (!comparePasswords) {
      throw createUpdateNotModifiedError(req, {entityName: "password"});
    }

    const updatedAccount = { ...accountMatchingId, password: updatedHashedPassword };

    const updatedAccountWithPassword = await this.datamapper.update(updatedAccount);

    return res.status(200).json(updatedAccountWithPassword);
  };

  getByPk = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      throw createMissingIdError(req, {entityName : "user"});
    }

    const accountMatchingId = await this.datamapper.findByPkWithNoReturnedPassword(id);

    if (!accountMatchingId) {
      throw createResourceNotFoundError(req, {entityName: "user", targetName: "user"});
    }

    return res.status(200).json(accountMatchingId);
  };

  deleteUser = async (req, res) => {
    return this.delete(req, res, "user", "account");
  };

}

export default UserController;
