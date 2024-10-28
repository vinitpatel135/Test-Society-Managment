const { Router } = require("express");
const asyncHandler = require('express-async-handler');
const visitorController = require("./VisitorController");
const visitorRouter = Router()

visitorRouter.post('/createvisitor', asyncHandler(visitorController.createvisitor))
visitorRouter.post('/createemergency', asyncHandler(visitorController.createEmergencyAnnouncement))
visitorRouter.get('/getvisitor', asyncHandler(visitorController.getvisitor))
visitorRouter.get('/getemergency', asyncHandler(visitorController.getEmergencyAnnouncement))


module.exports = visitorRouter