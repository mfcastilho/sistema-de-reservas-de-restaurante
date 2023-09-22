const { reservationsRepository, tablesRepository: Table, usersRepository: User } = require("../repositories/index");

class GetAllSystemReservationsService {
    async execute() {

        try {

            const repo = reservationsRepository;
            const allReservations = repo.findAll({
                include: [
                    {
                        model: Table,
                        as: "table",
                        attributes: { exclude: [ "createdAt", "updatedAt" ] }
                    },
                    {
                        model: User,
                        as: "user",
                        attributes: { exclude: ["password", "createdAt", "updatedAt"] }
                    }
                ],
                attributes: { exclude: [ "createdAt", "updatedAt" ] },
            });

            return allReservations;

        } catch (error) {
            throw error;
        }
    }
}

module.exports = GetAllSystemReservationsService;