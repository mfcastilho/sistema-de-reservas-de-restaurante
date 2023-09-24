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
            password: "123"
        });

        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("id");
    });


    it("It is not possible to register the administrator if any field is empty", async ()=>{
        const response = await request(app).post("/api/v1/register/admin").send({
            name: "",
            email: "mario@email.com",
            password: "123"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Todos os campos são obrigatórios.");
    });

    it("It is not possible to register the administrator with an existing email", async ()=>{
        let response = await request(app).post("/api/v1/register/admin").send({
            name: "Mario Frederico",
            email: "mario@email.com",
            password: "123"
        });

        response = await request(app).post("/api/v1/register/admin").send({
            name: "Mario da Silva",
            email: "mario@email.com",
            password: "123"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toEqual("Já existe um administrador cadastrado com o e-mail informado.");
    });

    
});