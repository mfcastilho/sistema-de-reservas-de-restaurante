const { reservationsRepository, tablesRepository } = require("../repositories/index");

async function checkTableAvailabilityMiddleware(req, res, next) {
  try {
    const { table_number, date, hour } = req.body;

    const repo = reservationsRepository;
    const repoTables = tablesRepository;

    const dateHourReservation = new Date(`${date}T${hour}:00`);

    const table = await repoTables.findOne({where: {table_number}, raw:true});

    console.log(table);
    
    const conflict = await repo.findOne({
      where: {
        id_table: table.id,
        date_hour_reservation: dateHourReservation,
      },
    });

    if (conflict) {
      return res.status(400).json({error: `A mesa ${table_number} já está reservada para este horário.`});
    }

    req.table_id = table.id;
    return next();

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = checkTableAvailabilityMiddleware;
