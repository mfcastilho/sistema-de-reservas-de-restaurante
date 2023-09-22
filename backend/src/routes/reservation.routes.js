const { Router } = require("express");
const reservationRoutes = Router();
const { CreateReservationController, GetAllUserReservationsController, DeleteReservationController } = require("../controllers/index");

const { checkTableAvailability, validationReservation, verifyToken } = require("../middlewares/index");


reservationRoutes.post("/reservation", verifyToken, validationReservation, checkTableAvailability, CreateReservationController.handle);
reservationRoutes.get("/reservations/user", verifyToken, GetAllUserReservationsController.handle);
reservationRoutes.delete("/reservation/:id", verifyToken, DeleteReservationController.handle);


module.exports = reservationRoutes;