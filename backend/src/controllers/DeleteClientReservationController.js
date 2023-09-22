const { DeleteClientReservationService } = require("../services/index");


class DeleteClientReservationController {
    async handle(req, res) {

        try {

            const { id } = req.params;
            const service = new DeleteClientReservationService();

            const response = await service.execute({ id });

            if(response instanceof Error) return res.status(404).json({error: response.message});

            return res.status(200).json({message: response});

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }


    }
}

module.exports = new DeleteClientReservationController;