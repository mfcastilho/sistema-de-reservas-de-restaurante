const { CreateUserService } = require("../services/index");

class CreateUserController {
    async handle(req, res) {
        const { name, email, password } = req.body;

        const service = new CreateUserService();

        const result = await service.execute({ name, email, password });

        if(result instanceof Error) return res.status(400).json({error: result.message});

        return res.status(201).json(result);
    }
}

module.exports = new CreateUserController;