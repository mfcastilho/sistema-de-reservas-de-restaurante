const { usersRepository } = require("../repositories");

const verifyIfEmailNotExists = async (req, res, next)=>{

    try {
        
        const { email } = req.body;
        const repo = usersRepository;

        const emailExists = await repo.findOne({where:{email:email}, raw:true});

        if(!emailExists) return res.status(404).json({error: "Email e/ou senha incorretos."});

        return next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
    
}

module.exports = verifyIfEmailNotExists;