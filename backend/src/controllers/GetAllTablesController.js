const { GetAllTablesService } = require("../services/index");

class GetAllTablesController {
    async handle(req, res) {

        try {
            const service = new GetAllTablesService();
            const restaurantTables = await service.execute();

            return res.status(200).json(restaurantTables);
        } catch (error) {
            return res.status(500).json({error: "Erro interno do servidor."});
        }
    }
}

module.exports = new GetAllTablesController;

