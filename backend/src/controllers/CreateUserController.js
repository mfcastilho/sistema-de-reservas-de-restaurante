const { CreateUserService } = require("../services/index");

class CreateUserController {
    async handle(req, res) {
        try {
            const { name, email, password } = req.body;

            const service = new CreateUserService();

            const role = "client";

            const userCreated = await service.execute({ name, email, password, role });

            return res.status(201).json(userCreated);

        } catch (error) {
            return res.status(500).json({error: "Erro interno do servidor."});
        }
    }
}

module.exports = new CreateUserController;