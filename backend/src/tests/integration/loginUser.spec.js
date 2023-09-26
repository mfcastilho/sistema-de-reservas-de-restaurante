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
            password: "12345"
        });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("It is possible to log in", async () => {

        const response = await request(app).post("/api/v1/login").send({
        email: "davi@email.com",
        password: "12345"
        });

        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("token")
    });


    it("The user cannot log in if any field is empty", async () => {
        const response = await request(app).post("/api/v1/login").send({
          email: "",
          password: "12345"
        });
  
        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Todos os campos são obrigatórios.");
    });

    it("The user cannot log in if the email is invalid", async () => {
        const response = await request(app).post("/api/v1/login").send({
          email: "davi25@email.com",
          password: "12345"
        });
  
        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Email e/ou senha incorretos.");
    });


    it("The user cannot log in if the password is invalid", async () => {
        const response = await request(app).post("/api/v1/login").send({
          email: "davi25@email.com",
          password: "12345"
        });
  
        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Email e/ou senha incorretos.");
    });

});
