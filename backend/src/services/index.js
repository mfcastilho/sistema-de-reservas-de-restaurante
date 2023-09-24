const CreateUserService = require("./CreateUserService");
const GetAllTablesService = require("./GetAllTablesService");
const LoginUserService = require("./LoginUserService");
const CreateAdminService = require("./CreateAdminService");
const CreateReservationService = require("./CreateReservationService");
const GetAllUserReservationsService = require("../services/GetAllUserReservationsService");
const DeleteReservationService = require("./DeleteReservationService");
const GetAllSystemReservationsService = require("./GetAllSystemReservationsService");
const DeleteClientReservationService = require("./DeleteClientReservationService");
const CreateTableService = require("./CreateTableService");



module.exports = {
    CreateUserService,
    LoginUserService,
    GetAllTablesService,
    CreateAdminService,
    CreateReservationService,
    GetAllUserReservationsService,
    DeleteReservationService,
    GetAllSystemReservationsService,
    DeleteClientReservationService,
    CreateTableService
}
