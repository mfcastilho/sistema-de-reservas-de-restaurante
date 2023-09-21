const { reservationsRepository } = require("../repositories/index");
const { v4:makeId } = require("uuid");


class CreateReservationService {
    async execute(reservationData) {
        try {
            const repo = reservationsRepository;

            const { table_number, date, hour, table_id, user_id } = reservationData;
            const dateHourReservation = new Date(`${date}T${hour}:00`);

            const reservationCreated = await repo.create({
                id:makeId(),
                date_hour_reservation:dateHourReservation,
                id_table: table_id,
                id_user: user_id
            });

            return reservationCreated;
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CreateReservationService;

