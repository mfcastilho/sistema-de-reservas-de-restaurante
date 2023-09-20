const {  Router } = require("express");
const userRoutes = Router();
const { CreateUserController } = require("../controllers/index");
const { verifyFields } = require("../middlewares/index");


userRoutes.post("/users", verifyFields, CreateUserController.handle);

module.exports = userRoutes;