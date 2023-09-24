const CreateAdminController = require("./CreateAdminController");
const CreateUserController = require("./CreateUserController");
const GetAllTablesController = require("./GetAllTablesController");
const LoginUserController = require("./LoginUserController");
const CreateReservationController = require("./CreateReservationController");
const GetAllUserReservationsController = require("./GetAllUserReservationsController");
const DeleteReservationController = require("./DeleteReservationController");
const GetAllSystemReservationsController = require("./GetAllSystemReservationsController");
const DeleteClientReservationController = require("./DeleteClientReservationController");
const CreateTableController = require("./CreateTableController");



module.exports = {
    CreateUserController,
    LoginUserController,
    GetAllTablesController,
    CreateAdminController,
    CreateReservationController,
    GetAllUserReservationsController,
    DeleteReservationController,
    GetAllSystemReservationsController,
    DeleteClientReservationController,
    CreateTableController
}