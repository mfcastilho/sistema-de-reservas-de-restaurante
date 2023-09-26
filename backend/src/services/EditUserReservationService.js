const { reservationsRepository, tablesRepository: Table, usersRepository: User } = require("../repositories/index");


class EditUserReservationService {
    async execute(reservationData) {
        try {
            const repo = reservationsRepository;

            const { id, date, hour, table_id, user_id } = reservationData;
           
            const reservation = await repo.findByPk(id);

            if(!reservation) return Error("Reserva não encontrada.");

            const dateHourReservation = new Date(`${date}T${hour}:00`);
            
            await repo.update({
                date_hour_reservation:dateHourReservation,
                id_table: table_id,
            },{where:{id}});

            const reservationUpdated = await repo.findOne({
                where: {id: reservation.id},
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
            })

            return reservationUpdated;
    
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = EditUserReservationService;

