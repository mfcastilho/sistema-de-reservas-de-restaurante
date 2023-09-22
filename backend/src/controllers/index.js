const CreateAdminController = require("./CreateAdminController");
const CreateUserController = require("./CreateUserController");
const GetAllTablesController = require("./GetAllTablesController");
const LoginUserController = require("./LoginUserController");
const CreateReservationController = require("./CreateReservationController");
const GetAllUserReservationsController = require("./GetAllUserReservationsController");



module.exports = {
    CreateUserController,
    LoginUserController,
    GetAllTablesController,
    CreateAdminController,
    CreateReservationController,
    GetAllUserReservationsController
}