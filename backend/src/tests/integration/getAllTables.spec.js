const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models");



describe("Get All Tables", ()=>{

    // let authToken;

    beforeAll(async () => {

        process.env.NODE_ENV = 'test';
        process.env.DATABASE_URL = 'sqlite::memory:';
    
        await sequelize.sync({ force: true });

         
        //  const admin = await request(app).post("/api/v1/register/admin").send({
        //     name: "João",
        //     email: "joao@email.com",
        //     password: "123"
        // });

        // const adminLogged = await request(app).post("/api/v1/login").send({
        //     email: "joao@email.com",
        //     password: "123"
        // });

        // authToken = adminLogged.body.token;
        
        
        await request(app).post("/api/v1/table")
        .send({
            table_number: 1,
            capacity: 3,
            is_available: true
        });

        await request(app).post("/api/v1/table")
        .send({
            table_number: 2,
            capacity: 2,
            is_available: true
        });

        await request(app).post("/api/v1/table")
        .send({
            table_number: 3,
            capacity: 4,
            is_available: true
        });
        
    });
    
    afterAll(async () => {
        await sequelize.close();
    });

    it("É possível listar todas as mesas do sistema", async ()=>{
        const response = request(app)
        .get("/api/v1/tables")

        expect(response.ok).toBeTruthy();
    });


    // it("Não é possível listar todas as mesas do sistema, pois o token de autenticação é inválido", async ()=>{
    //     const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1ZDkyMTNjLWU0YjEtNGYzNy04OGI3LWE3N2Y5M2FmMTg4MSIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2OTU1MTEwNzMsImV4cCI6MTY5NTU5NzQ3M30.F51hmqZ18rl-3I60r_kuTpoGyaAL0ly9xmtPnIcz8";

    //     const response = await request(app)
    //     .get("/api/v1/tables")

    //     expect(response.ok).toBeFalsy()
    //     expect(response.body).toHaveProperty("error");
    //     expect(response.body.error).toEqual("Para acessar este recurso um token de autenticação válido deve ser enviado.");
    // });


});