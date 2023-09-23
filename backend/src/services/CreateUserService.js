const { usersRepository } = require("../repositories/index");
const { v4:makeId } = require("uuid");
const bcrypt = require("bcrypt");



class CreateUserService {
    async execute(userData) {
        try {
            const { name, email, password, role } = userData;
            const repo = usersRepository;

            const cryptedPassword = await bcrypt.hash(password, 10);

            const newUser = {
                id: makeId(),
                name,
                email,
                password: cryptedPassword,
                role
            }

            await repo.create(newUser);

            delete newUser.password;

            return newUser;
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CreateUserService;