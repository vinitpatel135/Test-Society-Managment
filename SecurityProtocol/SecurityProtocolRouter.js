const express = require('express');
const securityProtocolController = require('./SecurityProtocolController.js')
const asyncHandler = require('express-async-handler')


const securityProtocolRouter = express.Router()

securityProtocolRouter.post('/createprotocol', asyncHandler(securityProtocolController.createProtocols))
securityProtocolRouter.get('/getprotocol', asyncHandler(securityProtocolController.getSecurityProtocols))
securityProtocolRouter.delete('/deleteprotocol/:id', asyncHandler(securityProtocolController.deleteProtocols))

module.exports = securityProtocolRouter
