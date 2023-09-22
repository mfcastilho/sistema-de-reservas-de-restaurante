const { reservationsRepository, tablesRepository: Table, usersRepository: User } = require("../repositories/index");


class GetAllUserReservationsService {
    async execute(userId) {
        
        try {
            const repo = reservationsRepository; 
            
            const userReservations = await repo.findAll({
                where: {id_user: userId},
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

            return userReservations;

        } catch (error) {
            throw error;
        }
    }
}


module.exports = GetAllUserReservationsService;