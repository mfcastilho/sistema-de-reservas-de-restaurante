const { LoginUserService } = require("../services/index");

class LoginUserController {

    async handle(req, res) {
        const { email, password } = req.body;

        const service = new LoginUserService();

        const userlogged = await service.execute({ email });

        return res.status(200).json(userlogged);
    } 
}

module.exports = new LoginUserController;