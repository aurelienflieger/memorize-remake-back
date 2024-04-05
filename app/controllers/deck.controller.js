import CoreController from './core.controller.js'
import { DeckDataMapper } from '../datamappers/index.datamapper.js'
import { createFailedCreationError, createMissingIdError, createResourceNotFoundError, createUpdateNotModifiedError, createMissingParamsError } from '../errors/helpers.error.js'
import debugLogger from '../utils/debugLogger.util.js'

const logger = debugLogger('deck.controller.js')

export default class DeckController extends CoreController {
  constructor() {
    const datamapper = new DeckDataMapper()

    super(datamapper)

    this.datamapper = datamapper
  }

  getAllDecksByUserID = async (req, res) => {
    let userId, decksMatchingUserId
    try {
      userId = req.params.id
    }
    catch {
      throw createMissingIdError(req, { entityName: 'user' })
    }

    try {
      decksMatchingUserId = await this.datamapper.findAllDecksByUserID(userId)
    }
    catch {
      throw new createResourceNotFoundError(req, { entityName: 'user', targetName: 'deck' })
    }

    logger(`All decks matching user ID ${userId} were retrieved.`)

    res.status(200).json(decksMatchingUserId)
  }

  createNewDeck = async (req, res) => {
    let userId, createdDeck

    try {
      userId = req.params.id
    }
    catch {
      throw createMissingIdError(req, { entityName: 'user' })
    }

    const deck = { ...req.body, user_id: userId }

    try {
      createdDeck = await this.datamapper.insert(deck)
    }
    catch {
      throw createFailedCreationError(req, { entityName: 'deck' })
    }

    logger('The deck was successfully created.')

    res.status(200).json(createdDeck)
  }

  updateDeck = async (req, res) => {
    let deckId, deckName, deckDescription, deckMatchingId, updatedDeck

    try {
      deckId = req.params.id
    }
    catch {
      throw createMissingIdError(req, { entityName: 'deck' })
    }

    try {
      deckName = req.body.name
      deckDescription = req.body.description
    }
    catch {
      throw createMissingParamsError(req, { entityName: 'deck', params: [deckName, deckDescription] })
    }

    try {
      deckMatchingId = await this.datamapper.findByPk(deckId)
    }
    catch {
      throw createResourceNotFoundError(req, { entityName: 'deck', targetName: 'deck' })
    }

    deckName ? deckName : deckName = deckMatchingId.name
    deckDescription ? deckDescription : deckDescription = deckMatchingId.description

    const isNotModified = deckMatchingId.name === deckName && deckMatchingId.description === deckDescription

    if (isNotModified) {
      throw createUpdateNotModifiedError(req, { entityName: 'deck' })
    }

    const newDeckInfo = { ...deckMatchingId, name: deckName, description: deckDescription }

    try {
      updatedDeck = await this.datamapper.update(newDeckInfo)
    }
    catch {
      throw createUpdateNotModifiedError(req, { entityName: 'deck' })
    }

    logger('The deck was successfully updated.')

    return res.status(200).json(updatedDeck)
  }

  deleteDeck = async (req, res) => {
    return this.delete(req, res, 'deck', 'user')
  }

  getDeckById = async (req, res) => {
    return this.getByPk(req, res, 'deck', 'user')
  }
}
