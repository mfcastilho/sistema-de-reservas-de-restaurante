const { GetAllSystemReservationsService } = require("../services/index");

class GetAllSystemReservationsController {
    async handle(req, res) {

        try {

            const service = new GetAllSystemReservationsService();
            const allReservations = await service.execute();

            return res.status(201).json(allReservations);
            
        } catch (error) {
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }
}

module.exports = new GetAllSystemReservationsController;