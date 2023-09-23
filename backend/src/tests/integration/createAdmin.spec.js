const request = require("supertest");
const app = require("../../app");
const connection = require("../../models/index");
const truncate = require("./truncate");

describe("Create Admin", ()=>{
    afterAll(()=>{
        connection.sequelize.close();
    });

    beforeEach(async () => {
        await truncate(connection.sequelize.models);
    });

    it("É possível criar um admnistrador", async ()=>{
        const response = await request(app).post("/api/v1/register/admin").send({
            name: "Mario",
            email: "mario@email.com",
            password: "123"
        });

        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("id");
    });


    it("Não é possível cadastrar o admnistrador se algum campo estiver vazio", async ()=>{
        const response = await request(app).post("/api/v1/register/admin").send({
            name: "",
            email: "mario@email.com",
            password: "123"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Todos os campos são obrigatórios.");
    });

    it("Não é possível cadastrar o admnistrador com email existente", async ()=>{
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