
const { usersRepository } = require("../repositories");

const verifyEmail = async (req, res, next)=>{
    const { email } = req.body;

    const repo = usersRepository;

    const userExists = await repo.findOne({ where: {email}, raw:true });

    if(userExists) return res.status(409).json({error: "Já existe usuário cadastrado com o e-mail informado."});

    return next();
}

module.exports = verifyEmail;