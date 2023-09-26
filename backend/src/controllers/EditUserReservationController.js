const { EditUserReservationService } = require("../services/index");


class EditUserReservationController {
    async handle(req, res) {
        try {

            const { date, hour, table_number }= req.body;
            const { id } = req.params;
            const user_id = res.req.decoded.id;
            const table_id = req.table_id;
            
            const service = new EditUserReservationService();

            const response = await service.execute({ id, date, hour, table_id, user_id });

            if(response instanceof Error) return res.status(404).json(response.message);

            return res.status(200).json(response);
            
        } catch (error) {
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }
}

module.exports = new EditUserReservationController;