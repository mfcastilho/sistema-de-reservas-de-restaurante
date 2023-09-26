
const verifyEditReservationFields = (req, res, next)=>{

    const { table_number, date, hour } = req.body;

    if(!table_number || !date || !hour) return res.status(400).json({error: "Todos os campos são obrigatórios."});

    return next();  
}


module.exports = verifyEditReservationFields;