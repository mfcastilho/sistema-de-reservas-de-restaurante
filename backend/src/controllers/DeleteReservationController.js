const { DeleteReservationService } = require("../services/index");


class DeleteReservationController {
    async handle(req, res) {

        try {

            const { id } = req.params;
            const service = new DeleteReservationService();

            const response = await service.execute({ id });

            if(response instanceof Error) return res.status(404).json({error: response.message});

            return res.status(200).json({message: response});

        } catch (error) {
            return res.status(500).json({ error: "Erro interno do servidor." });
        }


    }
}

module.exports = new DeleteReservationController;