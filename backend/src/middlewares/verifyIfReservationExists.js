const { reservationsRepository } = require("../repositories/index");

const verifyIfRservationExists = async (req, res, next)=>{
    try {
        const repo = reservationsRepository;

        const { id } = req.params;

        const reservation = await repo.findByPk(id);

        if(!reservation) return res.status(404).json({error: "Reserva não encontrada."});

        return next();

    } catch (error) {
        throw error;
    }
}

module.exports = verifyIfRservationExists;