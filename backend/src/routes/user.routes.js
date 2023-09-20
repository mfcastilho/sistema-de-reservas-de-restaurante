const {  Router } = require("express");
const userRoutes = Router();
const { CreateUserController, LoginUserController } = require("../controllers/index");
const { verifyFields, verifyIfEmailNotExists } = require("../middlewares/index");


userRoutes.post("/users", verifyFields, CreateUserController.handle);
userRoutes.post("/login", verifyIfEmailNotExists, LoginUserController.handle);

module.exports = userRoutes;