const { tablesRepository } = require("../repositories/index");

class GetAllTables {
    async execute() {
        try {
            const repo = tablesRepository;

            const restaurantTables = await repo.findAll({
                order: [["table_number", "ASC"]], 
                raw:true 
            });

            return restaurantTables;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = GetAllTables;