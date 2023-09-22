const { reservationsRepository, tablesRepository: Table, usersRepository: User } = require("../repositories/index");


class DeleteReservationService {
    async execute(reservationData) {

        const { id } = reservationData;
        const repo = reservationsRepository;

        const rowsDeleted = await repo.destroy({ where: {id} });
        console.log(rowsDeleted);
        if (rowsDeleted < 1) return new Error("Reserva não encontrada.");

        return "Reserva excluída com sucesso.";
    }
}

module.exports = DeleteReservationService;