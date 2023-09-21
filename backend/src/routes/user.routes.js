const {  Router } = require("express");
const userRoutes = Router();
const { CreateUserController, CreateAdminController, LoginUserController } = require("../controllers/index");
const { verifyFields, 
        verifyIfEmailNotExists, 
        verifyLoginPassword,
        verifyEmail,
        verifyAdminRegistration,
        verifyToken} = require("../middlewares/index");


userRoutes.post("/register/client", verifyFields, verifyEmail, CreateUserController.handle);
userRoutes.post("/register/admin", verifyFields, verifyAdminRegistration, CreateAdminController.handle);
userRoutes.post("/login", verifyFields, verifyIfEmailNotExists, verifyLoginPassword, LoginUserController.handle);


module.exports = userRoutes;