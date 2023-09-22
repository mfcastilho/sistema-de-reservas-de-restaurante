const { Router } = require("express");
const reservationRoutes = Router();
const { CreateReservationController, GetAllUserReservationsController } = require("../controllers/index");

const { checkTableAvailability, validationReservation, verifyToken } = require("../middlewares/index");


reservationRoutes.post("/reservation", verifyToken, validationReservation, checkTableAvailability, CreateReservationController.handle);
reservationRoutes.get("/reservations/user", verifyToken, GetAllUserReservationsController.handle);


module.exports = reservationRoutes;