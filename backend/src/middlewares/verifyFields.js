


const verifyFields = (req, res, next)=>{

    console.log(req.url);

    if(req.url == "/login"){
        const { email, password } = req.body;

        if(!email || !password) return res.status(400).json({error: "Todos os campos são obrigatórios."});

        return next();
    }

    if(req.url == "/users"){
        const { name, email, password } = req.body;

        if(!name || !email || !password) return res.status(400).json({error: "Todos os campos são obrigatórios."});

        return next();
    }

    
}


module.exports = verifyFields;