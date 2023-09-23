const request = require("supertest");
const app = require("../../app");
const connection = require("../../models/index");
const truncate = require("./truncate");



describe("Create User", ()=>{

    afterAll(()=>{
        connection.sequelize.close();
    });

    beforeEach(async () => {
        await truncate(connection.sequelize.models);
    });

    it("É possível criar um usuário", async ()=>{
        const response = await request(app).post("/api/v1/register/client").send({
            name: "joaquim",
            email: "joaquim@email.com",
            password: "123"
        });

        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("id");
    });


    it("Não é possível cadastrar o usuário se algum campo estiver vazio", async ()=>{
        const response = await request(app).post("/api/v1/register/client").send({
            name: "",
            email: "joaquim@email.com",
            password: "123"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Todos os campos são obrigatórios.");
    });

    it("Não é possível cadastrar o usuário com email existente", async ()=>{
        let response = await request(app).post("/api/v1/register/client").send({
            name: "Joaquim Castilho",
            email: "joaquim@email.com",
            password: "123"
        });

        response = await request(app).post("/api/v1/register/client").send({
            name: "Joaquim Medeiros",
            email: "joaquim@email.com",
            password: "123"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toEqual("Já existe usuário cadastrado com o e-mail informado.");
    });

    
});