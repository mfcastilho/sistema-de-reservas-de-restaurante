const { tablesRepository } = require("../repositories/index");

class GetAllTables {
    async execute() {
        const repo = tablesRepository;

        const restaurantTables = await repo.findAll({
            order: [["table_number", "ASC"]], 
            raw:true 
        });

        return restaurantTables;
    }
}

module.exports = GetAllTables;