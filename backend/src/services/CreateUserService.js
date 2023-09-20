const { usersRepository } = require("../repositories/index");
const { v4:makeId } = require("uuid");



class CreateUserService {
    async execute(userData) {
        try {
            const { name, email, password } = userData;
            const repo = usersRepository;

            if(await repo.findOne({where:{email:email}})) throw new Error("Usuário já se encontra cadastrado.");

            const newUser = {
                id: makeId(),
                name,
                email,
                password
            }

            await repo.create(newUser);
            
        } catch (error) {
            throw new Error("Erro interno do servidor.");
        }
    }
}

module.exports = CreateUserService;