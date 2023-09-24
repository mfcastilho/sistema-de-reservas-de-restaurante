const CreateTableService = require("../services/CreateTableService");

class CreateTableController {
    async handle(req, res) {
        
        try {
            const { table_number, capacity, is_available } = req.body;

            const service = new CreateTableService();

            const tableCreated = await service.execute({ table_number, capacity, is_available });

            return res.status(201).json(tableCreated);

        } catch (error) {
            return res.status(500).json({error: "Erro interno do servidor."});
        }
    }
}

module.exports = new CreateTableController;