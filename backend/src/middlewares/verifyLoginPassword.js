const { usersRepository } = require("../repositories");
const bcrypt = require("bcrypt");

const verifyLoginPassword = async (req, res, next)=>{
    try {
        const { email, password} = req.body;

        const repo = usersRepository;

        const { password: encryptedPassword } = await repo.findOne({ where:{email}, raw:true });

        const passwordIsValid = await bcrypt.compare(password, encryptedPassword);

        if(!passwordIsValid) return res.status(401).json({error: "Email e/ou senha incorretos."});

        return next();
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}

module.exports = verifyLoginPassword;