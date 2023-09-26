const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models");

describe("Create Admin", ()=>{
    

    beforeAll(async () => {

        process.env.NODE_ENV = 'test';
        process.env.DATABASE_URL = 'sqlite::memory:';
    
        await sequelize.sync({ force: true });
    });
    
    afterAll(async () => {
        await sequelize.close();
    });

    it("It is possible to create an administrator", async ()=>{
        const response = await request(app).post("/api/v1/register/admin").send({
            name: "Mario",
            email: "mario@email.com",
            password: "12345"
        });

        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("id");
    });


    it("It is not possible to register the administrator if any field is empty", async ()=>{
        const response = await request(app).post("/api/v1/register/admin").send({
            name: "",
            email: "mario@email.com",
            password: "12345"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Todos os campos são obrigatórios.");
    });


    it("It is not possible to register the Admin if the name does not contain a minimum of 5 characters.", async ()=>{
        let response = await request(app).post("/api/v1/register/client").send({
            name: "ma",
            email: "mario45@email.com",
            password: "12345"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("O nome tem que ter no mínimo 3 e no máximo 30 caracteres.");
    });

    it("It is not possible to register the Admin if the name does not contain a maximum of 30 characters.", async ()=>{
        let response = await request(app).post("/api/v1/register/client").send({
            name: "Mario Castilho da Silva de Alburquerque Sampaio Figueiredo Jr",
            email: "mario67@email.com",
            password: "12345"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("O nome tem que ter no mínimo 3 e no máximo 30 caracteres.");
    });
    

    it("It is not possible to register the administrator with an existing email", async ()=>{
        let response = await request(app).post("/api/v1/register/admin").send({
            name: "Mario Frederico",
            email: "mario@email.com",
            password: "12345"
        });

        response = await request(app).post("/api/v1/register/admin").send({
            name: "Mario da Silva",
            email: "mario@email.com",
            password: "12345"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toEqual("Já existe um administrador cadastrado com o e-mail informado.");
    });

    it("It is not possible to register the admin with an ivalid email format", async ()=>{
        const response = await request(app).post("/api/v1/register/admin").send({
            name: "Mario",
            email: "mario-email.com",
            password: "12345"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Formato de email inválido.");
    });

    it("It is not possible to register the Admin if the password does not contain a minimum of 5 characters.", async ()=>{
        let response = await request(app).post("/api/v1/register/client").send({
            name: "mario Castilho",
            email: "mario@email.com",
            password: "123"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("A senha deve conter no mínimo 5 e no máximo 16 caracteres.");
    });

    it("It is not possible to register the Admin if the password does not contain a maximum of 16 characters.", async ()=>{
        let response = await request(app).post("/api/v1/register/client").send({
            name: "mario Castilho",
            email: "mario@email.com",
            password: "1234567891011121314"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("A senha deve conter no mínimo 5 e no máximo 16 caracteres.");
    });
    
});