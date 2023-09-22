
const { usersRepository } = require("../repositories");

const verifyEmail = async (req, res, next)=>{

    try {
        
        const { email } = req.body;

        const repo = usersRepository;

        const userExists = await repo.findOne({ where: {email}, raw:true });

        if(userExists) return res.status(409).json({error: "Já existe usuário cadastrado com o e-mail informado."});

        return next();

    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}

module.exports = verifyEmail;