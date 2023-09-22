const { GetAllUserReservationsService } = require("../services/index");


class GetAllUserReservationsController {
    async handle(req, res) {

        try {
            const userId = res.locals.decoded.id;

            const service = new GetAllUserReservationsService();

            const userReservations = await service.execute(userId);

            return res.status(200).json(userReservations);
            
        } catch (error) {
            return res.status(500).json({error: "Erro interno do servidor."});
        }
    }
}

module.exports = new GetAllUserReservationsController;