const { CreateReservationService } = require("../services/index");


class CreateReservationController {
    async handle(req, res) {
        try {
            const { date, hour } = req.body;
            const table_id = req.table_id;
            const user_id = res.locals.decoded.id

            const service = new CreateReservationService();

            const reservationCreated = await service.execute({ date, hour, table_id, user_id });

            return res.status(201).json(reservationCreated);
            
        } catch (error) {
            return res.status(500).json({ error:"Erro interno do servidor." });
        }
    }
}

module.exports = new CreateReservationController;