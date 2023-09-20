const { usersRepository } = require("../repositories/index");
const { v4:makeId } = require("uuid");
const bcrypt = require("bcrypt");



class CreateUserService {
    async execute(userData) {
        try {
            const { name, email, password } = userData;
            const repo = usersRepository;

            const cryptedPassword = await bcrypt.hash(password, 10);

            const newUser = {
                id: makeId(),
                name,
                email,
                password: cryptedPassword
            }

            await repo.create(newUser);

            delete newUser.password;

            return newUser;
            
        } catch (error) {
            throw new Error("Erro interno do servidor.");
        }
    }
}

module.exports = CreateUserService;