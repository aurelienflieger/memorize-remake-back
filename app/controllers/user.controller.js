import bcrypt from 'bcrypt'
import { UserDataMapper } from '../datamappers/index.datamapper.js'
import {
  createFailedCreationError,
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
    const { email: inputEmail, password: inputPassword } = req.body
    let newUser

    if (!inputEmail || !inputPassword) {
      throw createMissingParamsError(req, {
        entityName: 'user',
        params: ['email', 'password'],
      })
    }

    const user = await this.datamapper.getUserByEmail(inputEmail)

    if (!user) {
      throw createResourceNotFoundError(req, {
        entityName: 'user',
        targetName: 'user',
      })
    }

    const validPassword = await bcrypt.compare(inputPassword, user.password)

    if (!validPassword) {
      throw createIncorrectPasswordError(req)
    }

    const tokens = generateJWT(user)

    if (!tokens) {
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
    const { password, username, email } = req.body

    if (!password || !username || !email) {
      throw createMissingParamsError(req, {
        entityName: 'user',
        params: ['username', 'email', 'password'],
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    if (!hashedPassword) {
      throw createPasswordEncryptionError(req)
    }
    try {
      newUser = await this.datamapper.insert({
        email,
        username,
        password: hashedPassword,
      })
    }
    catch (error) {
      throw createAccountCreationError(req, error)
    }

    logger('The user successfully created an account.')

    res.status(201).json({ newUser })
  }

  updateAccountInfo = async (req, res) => {
    const { id } = req.params

    if (!id) {
      throw createMissingIdError(req, { entityName: 'user' })
    }

    let { username, email } = req.body
    const accountMatchingId = await this.datamapper.findByPk(id)

    if (!accountMatchingId) {
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

    const updatedAccount = await this.datamapper.update(updatedAccountInfo)

    if (!updatedAccount) {
      throw createFailedUpdateError(req, { entityName: 'user' })
    }

    logger(`The user successfully updated their account's email or username.`)
    return res.status(200).json(updatedAccount)
  }

  updateAccountPassword = async (req, res) => {
    const { id } = req.params

    if (!id) {
      throw createMissingIdError(req, { entityName: 'user' })
    }

    let { password, newPassword } = req.body

    const accountMatchingId = await this.datamapper.findByPk(id)

    if (!accountMatchingId) {
      throw createResourceNotFoundError(req, {
        entityName: 'user',
        targetName: 'user',
      })
    }

    // Compares the unencrypted input password to the saved hashed password in the DB
    const validPassword = await bcrypt.compare(
      password,
      accountMatchingId.password,
    )

    // If the provided password from the form does not match the actual password in the DB, we send back an error to the client
    if (!validPassword) {
      throw createIncorrectPasswordError(req)
    }

    // If the provided password from the form matches the registered password, the updated password is hashed.
    const updatedHashedPassword = await bcrypt.hash(newPassword, 10)

    if (!updatedHashedPassword) {
      throw createPasswordEncryptionError(req)
    }

    // Finally, we compare the unencrypted updated password to the previous encrypted password.
    const comparePasswords = await bcrypt.compare(
      newPassword,
      accountMatchingId.password,
    )

    // If the unencrypted updated password matches the previous encrypted password, an error is thrown.
    if (comparePasswords) {
      throw createUpdateNotModifiedError(req, { entityName: 'password' })
    }

    const updatedAccount = {
      ...accountMatchingId,
      password: updatedHashedPassword,
    }

    // Only returns the account info which is not confidential (password excluded!)
    const updatedAccountWithPassword = await this.datamapper.update(
      updatedAccount,
    )

    logger(`The user successfully updated their account's password.`)

    return res.status(200).json(updatedAccountWithPassword)
  }

  getByPk = async (req, res) => {
    const { id } = req.params

    if (!id) {
      throw createMissingIdError(req, { entityName: 'user' })
    }

    const accountMatchingId
      = await this.datamapper.findByPkWithNoReturnedPassword(id)

    if (!accountMatchingId) {
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
