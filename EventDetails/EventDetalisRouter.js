const { Router } = require('express')
const asyncHandler = require('express-async-handler');
const eventDetilsController = require('./EventDetailsController');

const eventDetailsRouter = Router()

eventDetailsRouter.get("/:societyId", asyncHandler(eventDetilsController.listEventDetails))
eventDetailsRouter.get("/list/:eventId", asyncHandler(eventDetilsController.listDetailsByEvent))
eventDetailsRouter.put("/update", asyncHandler(eventDetilsController.updateEventDetails))
// eventDetailsRouter.post("/listbymember/:id", asyncHandler(eventDetilsController.getEventDetailsById))
eventDetailsRouter.post("/listbymember", asyncHandler(eventDetilsController.getEventDetailsById))

module.exports = eventDetailsRouter