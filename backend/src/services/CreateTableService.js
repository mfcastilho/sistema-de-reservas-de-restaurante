const { tablesRepository } = require("../repositories/index");
const { v4:makeId } = require("uuid");

class CreateTableService {
    async execute(tableDate) {

       try {
            const { table_number, capacity, is_available } = tableDate;
            const repo = tablesRepository;

            const newTable = {
                id:makeId(),
                table_number,
                capacity,
                is_available
            }

            await repo.create(newTable);

            return newTable;
       } catch (error) {
            throw error;
       }
    }
}


module.exports = CreateTableService;