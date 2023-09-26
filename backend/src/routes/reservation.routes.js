const { Router } = require("express");
const reservationRoutes = Router();

const { CreateReservationController, 
        GetAllUserReservationsController, 
        DeleteReservationController, 
        GetAllSystemReservationsController,
        DeleteClientReservationController,
        EditUserReservationController } = require("../controllers/index");
        
const { checkTableAvailability, 
        validationReservation, 
        verifyToken, 
        verifyIfIsAdmin, 
        verifyFields,
        verifyEditReservationFields} = require("../middlewares/index");



reservationRoutes.get("/admin/all-reservations", verifyToken, verifyIfIsAdmin, GetAllSystemReservationsController.handle);

reservationRoutes.delete("/admin/reservation/:id", verifyToken, verifyIfIsAdmin, DeleteClientReservationController.handle);

reservationRoutes.post("/reservation", verifyToken, verifyFields, validationReservation, checkTableAvailability, CreateReservationController.handle);

reservationRoutes.get("/user/reservations", verifyToken, GetAllUserReservationsController.handle);

reservationRoutes.put("/reservation/edit/:id", verifyToken, verifyEditReservationFields, validationReservation, checkTableAvailability, EditUserReservationController.handle);

reservationRoutes.delete("/reservation/:id", verifyToken, DeleteReservationController.handle);


module.exports = reservationRoutes;