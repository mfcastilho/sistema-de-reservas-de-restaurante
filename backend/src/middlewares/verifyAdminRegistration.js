const { usersRepository } = require("../repositories");

const verifyAdminRegistration = async (req, res, next) => {
    
    try {

        const { email } = req.body;
        const repo = usersRepository;

        const existingUser = await repo.findOne({ where: { email } });

        if (existingUser) {

            if (existingUser.role === "client") {

                existingUser.role = "admin";
                await existingUser.save();
                req.user = existingUser; 

            } else if (existingUser.role === "admin") {
            
                return res.status(409).json({ error: "Já existe um administrador cadastrado com o e-mail informado." });
            }
        }

        return next();

    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}

module.exports = verifyAdminRegistration;
