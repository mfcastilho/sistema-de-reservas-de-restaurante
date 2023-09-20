const {  Router } = require("express");
const userRoutes = Router();
const { CreateUserController } = require("../controllers/index");


userRoutes.post("/users", CreateUserController.handle);


module.exports = userRoutes;