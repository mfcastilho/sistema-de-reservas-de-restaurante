const { Router } = require("express");
const reservationRoutes = Router();

const { CreateReservationController, 
        GetAllUserReservationsController, 
        DeleteReservationController, 
        GetAllSystemReservationsController,
        DeleteClientReservationController } = require("../controllers/index");
        
const { checkTableAvailability, 
        validationReservation, 
        verifyToken, 
        verifyIfIsAdmin } = require("../middlewares/index");



reservationRoutes.get("/admin/all-reservations", verifyToken, verifyIfIsAdmin, GetAllSystemReservationsController.handle);

reservationRoutes.delete("/admin/reservation/:id", verifyToken, verifyIfIsAdmin, DeleteClientReservationController.handle);

reservationRoutes.post("/reservation", verifyToken, validationReservation, checkTableAvailability, CreateReservationController.handle);

reservationRoutes.get("/reservations/user", verifyToken, GetAllUserReservationsController.handle);

reservationRoutes.delete("/reservation/:id", verifyToken, DeleteReservationController.handle);


module.exports = reservationRoutes;