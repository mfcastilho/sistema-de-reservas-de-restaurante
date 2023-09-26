const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models");


describe("Create User", ()=>{

    beforeAll(async () => {

        process.env.NODE_ENV = 'test';
        process.env.DATABASE_URL = 'sqlite::memory:';
    
        await sequelize.sync({ force: true });
      });
    
      afterAll(async () => {
        await sequelize.close();
      });
    

    it("It is possible to create a user", async ()=>{
        const response = await request(app).post("/api/v1/register/client").send({
            name: "joaquim",
            email: "joaquim@email.com",
            password: "12345"
        });

        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("id");
    });


    it("It is not possible to register the user if any field is empty", async ()=>{
        const response = await request(app).post("/api/v1/register/client").send({
            name: "",
            email: "joaquim@email.com",
            password: "12345"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Todos os campos são obrigatórios.");
    });


    it("It is not possible to register the user with an existing email", async ()=>{
        let response = await request(app).post("/api/v1/register/client").send({
            name: "Joaquim Castilho",
            email: "joaquim@email.com",
            password: "123"
        });

        response = await request(app).post("/api/v1/register/client").send({
            name: "Joaquim Medeiros",
            email: "joaquim@email.com",
            password: "12345"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toEqual("Já existe usuário cadastrado com o e-mail informado.");
    });

    it("It is not possible to register the user with an ivalid email format", async ()=>{
        let response = await request(app).post("/api/v1/register/client").send({
            name: "Joaquim Castilho",
            email: "joaquim-email.com",
            password: "12345"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Formato de email inválido.");
    });


    it("It is not possible to register the User if the password does not contain a minimum of 5 characters.", async ()=>{
        let response = await request(app).post("/api/v1/register/client").send({
            name: "Joaquim Castilho",
            email: "joaquim@email.com",
            password: "123"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("A senha deve conter no mínimo 5 e no máximo 16 caracteres.");
    });

    it("It is not possible to register the User if the password does not contain a maximum of 16 characters.", async ()=>{
        let response = await request(app).post("/api/v1/register/client").send({
            name: "Joaquim Castilho",
            email: "joaquim@email.com",
            password: "1234567891011121314"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("A senha deve conter no mínimo 5 e no máximo 16 caracteres.");
    });

    
});