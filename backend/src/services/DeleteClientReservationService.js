const { reservationsRepository } = require("../repositories/index");


class DeleteClientReservationService {
    async execute(reservationData) {

        const { id } = reservationData;
        const repo = reservationsRepository;

        const rowsDeleted = await repo.destroy({ where: {id} });

        if (rowsDeleted < 1) return new Error("Reserva não encontrada.");

        return "Reserva excluída com sucesso.";
    }
}

module.exports = DeleteClientReservationService;