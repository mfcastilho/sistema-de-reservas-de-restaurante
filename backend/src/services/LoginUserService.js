const { usersRepository } = require("../repositories/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class LoginUserService {
    async execute(userData) {
        
            const { email } = userData;
            const repo = usersRepository;

            const user = await repo.findOne({where: {email}, raw: true});

            const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN});

            const { password, ...userLogged } = user;

            return { user: userLogged, token }; 
    }
}

module.exports = LoginUserService;