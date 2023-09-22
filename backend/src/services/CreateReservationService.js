const { reservationsRepository } = require("../repositories/index");
const { Table, User } = require("../models");
const { v4:makeId } = require("uuid");


class CreateReservationService {
    async execute(reservationData) {
        try {
            const repo = reservationsRepository;

            const { date, hour, table_id, user_id } = reservationData;
            const dateHourReservation = new Date(`${date}T${hour}:00`);

            const reservation = await repo.create({
                id:makeId(),
                date_hour_reservation:dateHourReservation,
                id_table: table_id,
                id_user: user_id
            });

            const reservationCreated = await repo.findOne({
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

            console.log(reservationCreated);

            return reservationCreated;

            
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CreateReservationService;

