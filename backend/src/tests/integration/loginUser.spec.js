const request = require("supertest");
const app = require("../../app");
const connection = require("../../models/index");
const truncate = require("./truncate");
const { User } = require("../../models");

describe("User Login", ()=>{

    afterAll(async ()=>{
        // await User.destroy({where: {email: "davi@email.com"}});
        connection.sequelize.close();
    });

    beforeAll( async ()=>{
        // await truncate(connection.sequelize.models);
        await request(app).post("/api/v1/register/client").send({
            name: "davi",
            email: "davi@email.com",
            password: "123"
        });
    });

    it("É possível fazer login", async ()=>{

        await request(app).post("/api/v1/register/client").send({
            name: "davi",
            email: "davi@email.com",
            password: "123"
        });
        
        let response = await request(app).post("/api/v1/login").send({
            email: "davi@email.com",
	        password: "123"
        });

        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("token");
    });

    it("Não é possível o usuário fazer login se algum campo estiver vazio", async ()=>{

        let response = await request(app).post("/api/v1/login").send({
            email: "",
	        password: "123"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Todos os campos são obrigatórios.");

    });

    it("Não é possível o usuário fazer se o email for inválido", async ()=>{
        let response = await request(app).post("/api/v1/login").send({
            email: "davi25@email.com",
	        password: "123"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Email e/ou senha incorretos.");
    });

    it("Não é possível o usuário fazer se a senha for inválida", async ()=>{
        let response = await request(app).post("/api/v1/login").send({
            email: "davi25@email.com",
	        password: "12345"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Email e/ou senha incorretos.");
    });

});