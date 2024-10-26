const { Router } = require("express");
const asyncHandler = require('express-async-handler');
const complaintController = require("./ComplaintController");

const complaintRouter = Router()

complaintRouter.post("/create", asyncHandler(complaintController.createComplaint))
complaintRouter.get("/list/:societyId", asyncHandler(complaintController.listAllComplain))
complaintRouter.get("/listComplain/:societyId", asyncHandler(complaintController.listComplain))
complaintRouter.get("/listRequest/:societyId", asyncHandler(complaintController.listRequest))
complaintRouter.get("/listById/:memeberId", asyncHandler(complaintController.createComplaint))

module.exports = complaintRouter