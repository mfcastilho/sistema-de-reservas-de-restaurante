const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models");

describe("User Login", () => {

    beforeAll(async () => {
        process.env.NODE_ENV = 'test';
        process.env.DATABASE_URL = 'sqlite::memory:';

        await sequelize.sync({ force: true });

        await request(app).post("/api/v1/register/client").send({
            name: "davi",
            email: "davi@email.com",
            password: "123"
        });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("É possível fazer login", async () => {

        const response = await request(app).post("/api/v1/login").send({
        email: "davi@email.com",
        password: "123"
        });

        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("token")
    });


    it("Não é possível o usuário fazer login se algum campo estiver vazio", async () => {
        const response = await request(app).post("/api/v1/login").send({
          email: "",
          password: "123"
        });
  
        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Todos os campos são obrigatórios.");
    });

    it("Não é possível o usuário fazer login se o email for inválido", async () => {
        const response = await request(app).post("/api/v1/login").send({
          email: "davi25@email.com",
          password: "123"
        });
  
        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Email e/ou senha incorretos.");
    });


    it("Não é possível o usuário fazer login se a senha for inválida", async () => {
        const response = await request(app).post("/api/v1/login").send({
          email: "davi25@email.com",
          password: "12345"
        });
  
        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Email e/ou senha incorretos.");
    });

});
