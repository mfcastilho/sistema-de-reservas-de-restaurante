const { isWithinInterval, isSunday } = require('date-fns');

async function validateReservationMiddleware(req, res, next) {
    const { date, hour } = req.body; 

    const dateHourReservation = new Date(`${date}T${hour}:00`);
    const currentDateTime = new Date();

    if (dateHourReservation <= currentDateTime) return res.status(400).json({ error: "Não foi possível realizar a reserva. A data e/ou a hora da reserva já passaram." });

    const startInterval = new Date(dateHourReservation);
    startInterval.setHours(18, 0, 0, 0);

    const endInterval = new Date(dateHourReservation);
    endInterval.setHours(23, 59, 59, 999);

    if (!isWithinInterval(dateHourReservation, { start: startInterval, end: endInterval })) {
        return res.status(400).json({ error: "Reservas permitidas apenas das 18:00 até 23:59, exceto aos domingos." });
    }

    if (isSunday(dateHourReservation)) {
        return res.status(400).json({ error: "Reservas não são permitidas aos domingos." });
    }

    return next();
}

module.exports = validateReservationMiddleware;
