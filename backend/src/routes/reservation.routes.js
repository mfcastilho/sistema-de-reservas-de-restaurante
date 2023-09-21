const { Router } = require("express");
const reservationRoutes = Router();
const { CreateReservationController } = require("../controllers/index");

const { checkTableAvailability, validationReservation, verifyToken } = require("../middlewares/index");


reservationRoutes.post("/reservation", verifyToken, validationReservation, checkTableAvailability, CreateReservationController.handle);


module.exports = reservationRoutes;