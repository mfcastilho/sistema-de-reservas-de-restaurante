const {  Router } = require("express");
const userRoutes = Router();

const { CreateUserController, CreateAdminController, LoginUserController } = require("../controllers/index");
const { verifyFields, 
        verifyIfEmailNotExists, 
        verifyLoginPassword,
        verifyEmail,
        verifyAdminRegistration,
        verifyRegistrationFields } = require("../middlewares/index");


userRoutes.post("/register/client", verifyFields, verifyRegistrationFields, verifyEmail, CreateUserController.handle);

userRoutes.post("/register/admin", verifyFields, verifyRegistrationFields, verifyAdminRegistration, CreateAdminController.handle);

userRoutes.post("/login", verifyFields, verifyIfEmailNotExists, verifyLoginPassword, LoginUserController.handle);


module.exports = userRoutes;