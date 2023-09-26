


const verifyFields = (req, res, next)=>{

    if(req.url === "/login"){
        const { email, password } = req.body;

        if(!email || !password) return res.status(400).json({error: "Todos os campos são obrigatórios."});

        return next();
    }

    if(req.url === "/register/client" || req.url == "/register/admin"){
        const { name, email, password } = req.body;

        if(!name || !email || !password) return res.status(400).json({error: "Todos os campos são obrigatórios."});

        return next();
    }

    if(req.url === "/table"){
        const { table_number, capacity, is_available } = req.body;

        if(!table_number || !capacity || !is_available) return res.status(400).json({error: "Todos os campos são obrigatórios."});

        return next();
    }

    if(req.url === "/reservation"){
        const { table_number, date, hour } = req.body;

        if(!table_number || !date || !hour) return res.status(400).json({error: "Todos os campos são obrigatórios."});

        return next();
    }

   
    
}


module.exports = verifyFields;