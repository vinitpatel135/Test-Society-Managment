const { Router } = require("express");
const asyncHandler = require('express-async-handler');
const userController = require("./UserController");

const userRouter = Router()

userRouter.post("/auth", asyncHandler(userController.authenticationPermission))
userRouter.post("/login", asyncHandler(userController.loginUser))

module.exports = userRouter