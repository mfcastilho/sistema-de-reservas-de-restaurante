const {  Router } = require("express");
const userRoutes = Router();
const { CreateUserController, LoginUserController } = require("../controllers/index");
const { verifyFields, 
        verifyIfEmailNotExists, 
        verifyLoginPassword,
        verifyEmail,
        verifyToken} = require("../middlewares/index");


userRoutes.post("/users", verifyFields, verifyEmail, CreateUserController.handle);
userRoutes.post("/login", verifyFields, verifyIfEmailNotExists, verifyLoginPassword, LoginUserController.handle);


module.exports = userRoutes;