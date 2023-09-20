const { usersRepository } = require("../repositories");
const bcrypt = require("bcrypt");

const verifyLoginPassword = async (req, res, next)=>{
    const { email, password} = req.body;

    const repo = usersRepository;

    const encryptedPassword = await repo.findOne({ where:{email}, raw:true });

    const passwordIsValid = await bcrypt.compare(password, encryptedPassword);

    if(!passwordIsValid) return res.status(401).json({error: "Email e/ou senha incorretos."});

    return next();
}

module.exports = verifyLoginPassword;