const { reservationsRepository, tablesRepository } = require("../repositories/index");

async function checkTableAvailability(req, res, next) {

    try {

        const { table_number, date, hour } = req.body;

        const repo = reservationsRepository;
        const repoTables = tablesRepository;

        const dateHourReservation = new Date(`${date}T${hour}:00`);

        const table = await repoTables.findOne({where: {table_number}, raw:true});

        if(!table) return res.status(404).json({error: `Não existe no nosso sistema a mesa de número ${table_number}.`});
        
        const conflict = await repo.findOne({
        where: {
            id_table: table.id,
            date_hour_reservation: dateHourReservation,
        },
        });

        if (conflict) return res.status(400).json({error: `A mesa ${table_number} já está reservada para este horário.`});

        req.table_id = table.id;
        
        return next();

    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}

module.exports = checkTableAvailability;
