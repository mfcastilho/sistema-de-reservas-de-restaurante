const { GetAllTablesService } = require("../services/index");

class GetAllTablesController {
    async handle(req, res) {

        const service = new GetAllTablesService();
        const restaurantTables = await service.execute();

        return res.status(200).json(restaurantTables);
    }
}

module.exports = new GetAllTablesController;

