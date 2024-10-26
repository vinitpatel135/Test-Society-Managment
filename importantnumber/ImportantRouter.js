const { Router } = require("express");
const importantController = require('./ImportantController')
const asyncHandler = require('express-async-handler');

const importantRouter = Router()

importantRouter.post("/create", asyncHandler(importantController.createWorkerNumber))
importantRouter.get("/list", asyncHandler(importantController.getWorkerDetails))
importantRouter.delete("/delete/:id", asyncHandler(importantController.deleteWorkerDetails))

module.exports = importantRouter