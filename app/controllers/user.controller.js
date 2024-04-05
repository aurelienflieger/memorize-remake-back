import bcrypt from 'bcrypt'
import { UserDataMapper } from '../datamappers/index.datamapper.js'
import {
  createFailedUpdateError,
  createIncorrectPasswordError,
  createMissingIdError,
  createMissingParamsError,
  createPasswordEncryptionError,
  createResourceNotFoundError,
  createTokenGenerationError,
  createUpdateNotModifiedError,
  createAccountCreationError,
} from '../errors/helpers.error.js'
import generateJWT from '../utils/generateJWT.util.js'
import CoreController from './core.controller.js'
import debugLogger from '../utils/debugLogger.util.js'

const logger = debugLogger('user.controller.js')

class UserController extends CoreController {
  constructor() {
    const datamapper = new UserDataMapper()

    super(datamapper)

    this.datamapper = datamapper
  }

  login = async (req, res) => {
    let inputEmail, inputPassword, user, tokens

    try {
      inputEmail = req.body.email
      inputPassword = req.body.password
    }
    catch {
      throw createMissingParamsError(req, {
        entityName: 'user',
        params: ['email', 'password'],
      })
    }

    try {
      user = await this.datamapper.getUserByEmail(inputEmail)
    }
    catch {
      throw createResourceNotFoundError(req, {
        entityName: 'user',
        targetName: 'user',
      })
    }

    try {
      await bcrypt.compare(inputPassword, user.password)
    }
    catch {
      throw createIncorrectPasswordError(req)
    }

    try {
      tokens = generateJWT(user)
    }
    catch {
      throw createTokenGenerationError(req)
    }

    const { email, username, id } = user

    const tokensWithUser = {
      ...tokens,
      email,
      username,
      id,
    }

    logger('The user successfully logged into their account.')

    res.status(200).json(tokensWithUser)
  }

  signup = async (req, res) => {
    let newUser, password, username, email, hashedPassword

    try {
      password = req.body.password
      username = req.body.username
      email = req.body.email
    }
    catch {
      throw createMissingParamsError(req, {
        entityName: 'user',
        params: ['username', 'email', 'password'],
      })
    }

    try {
      hashedPassword = await bcrypt.hash(password, 10)
    }
    catch {
      throw createPasswordEncryptionError(req)
    }

    try {
      newUser = await this.datamapper.insert({
        email,
        username,
        password: hashedPassword,
      })
    }
    catch {
      throw createAccountCreationError(req)
    }

    logger('The user successfully created an account.')

    res.status(201).json({ newUser })
  }

  updateAccountInfo = async (req, res) => {
    let id, username, email, accountMatchingId, updatedAccount
    try {
      id = req.params
    }
    catch {
      throw createMissingIdError(req, { entityName: 'user' })
    }

    username = req.body.username
    email = req.body.email

    try {
      accountMatchingId = await this.datamapper.findByPk(id)
    }
    catch {
      throw createResourceNotFoundError(req, {
        entityName: 'user',
        targetName: 'user',
      })
    }

    username ? username : (username = accountMatchingId.username)
    email ? email : (email = accountMatchingId.email)

    const isNotModified
      = accountMatchingId.username === username
      && accountMatchingId.email === email

    if (isNotModified) {
      throw createUpdateNotModifiedError(req, { entityName: 'user' })
    }

    const updatedAccountInfo = {
      ...accountMatchingId,
      email: email,
      username: username,
    }

    try {
      updatedAccount = await this.datamapper.update(updatedAccountInfo)
    }
    catch {
      throw createFailedUpdateError(req, { entityName: 'user' })
    }

    logger(`The user successfully updated their account's email or username.`)
    return res.status(200).json(updatedAccount)
  }

  updateAccountPassword = async (req, res) => {
    let id, password, newPassword, accountMatchingId, updatedHashedPassword, updatedAccount, updatedAccountWithPassword

    try {
      id = req.params.id
    }
    catch {
      throw createMissingIdError(req, { entityName: 'user' })
    }

    try {
      password = req.body
      newPassword = req.body
    }
    catch {
      throw createMissingParamsError(req, { entityName: 'user', params: ['password', 'newPassword'] })
    }

    try {
      accountMatchingId = await this.datamapper.findByPk(id)
    }
    catch {
      throw createResourceNotFoundError(req, {
        entityName: 'user',
        targetName: 'user',
      })
    }

    // Compares the unencrypted input password to the saved hashed password in the DB
    try {
      await bcrypt.compare(
        password,
        accountMatchingId.password,
      )
    }
    catch {
    // If the provided password from the form does not match the actual password in the DB, we send back an error to the client
      throw createIncorrectPasswordError(req)
    }

    // If the provided password from the form matches the registered password, the updated password is hashed.
    try {
      updatedHashedPassword = await bcrypt.hash(newPassword, 10)
    }
    catch {
      throw createPasswordEncryptionError(req)
    }

    // Finally, we compare the unencrypted updated password to the previous encrypted password.
    try {
      await bcrypt.compare(
        newPassword,
        accountMatchingId.password,
      )
    }
    catch {
      // If the unencrypted updated password matches the previous encrypted password, an error is thrown.
      throw createUpdateNotModifiedError(req, { entityName: 'password' })
    }

    updatedAccount = {
      ...accountMatchingId,
      password: updatedHashedPassword,
    }

    try {
    // Only returns the account info which is not confidential (password excluded!)
      updatedAccountWithPassword = await this.datamapper.update(
        updatedAccount,
      )
    }
    catch {
      throw createFailedUpdateError(req, { entityName: 'user' })
    }

    logger(`The user successfully updated their account's password.`)

    return res.status(200).json(updatedAccountWithPassword)
  }

  getByPk = async (req, res) => {
    let id, accountMatchingId

    try {
      id = req.params.id
    }
    catch {
      throw createMissingIdError(req, { entityName: 'user' })
    }

    try {
      accountMatchingId = await this.datamapper.findByPkWithNoReturnedPassword(id)
    }
    catch {
      throw createResourceNotFoundError(req, {
        entityName: 'user',
        targetName: 'user',
      })
    }

    logger(`The user was successfully fetched from the provided ID.`)

    return res.status(200).json(accountMatchingId)
  }

  deleteUser = async (req, res) => {
    return this.delete(req, res, 'user', 'account')
  }
}

export default UserController
