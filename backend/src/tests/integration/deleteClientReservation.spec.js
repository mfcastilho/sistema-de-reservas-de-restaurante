const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models");


describe("Delete Client Reservation", ()=>{
    let authToken; 
    let reservation;

    beforeAll(async () => {

        process.env.NODE_ENV = 'test';
        process.env.DATABASE_URL = 'sqlite::memory:';
    
        await sequelize.sync({ force: true });


        await request(app).post("/api/v1/table").send({
            table_number: 1,
            capacity: 3,
            is_available: true
        });

        await request(app).post("/api/v1/register/client").send({
            name: "João",
            email: "joao@email.com",
            password: "12345"
        });

        const userLogged = await request(app).post("/api/v1/login").send({
            email: "joao@email.com",
            password: "12345"
        });

        authToken = userLogged.body.token;

        reservation = await request(app)
        .post("/api/v1/reservation")
        .set('Authorization', `Bearer ${authToken}`) 
        .send({
            table_number: 1,
            date: "2023-10-03",
            hour: "20:30"
        });
    });
    
    afterAll(async () => {
        await sequelize.close();
    });


    it("The customer can delete a reservation", async ()=>{
        const response = await request(app).delete(`/api/v1/reservation/${reservation.body.id}`)
        .set("Authorization", `Bearer ${authToken}`);

        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Reserva excluída com sucesso.");
    });

    it("It is not possible to delete a reservation because the authentication token is invalid", async ()=>{
        const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1ZDkyMTNjLWU0YjEtNGYzNy04OGI3LWE3N2Y5M2FmMTg4MSIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2OTU1MTEwNzMsImV4cCI6MTY5NTU5NzQ3M30.F51hmqZ18rl-3I60r_kuTpoGyaAL0ly9xmtPnIcz8Z";

        const response = await request(app).delete(`/api/v1/reservation/${reservation.body.id}`)
        .set("Authorization", `Bearer ${invalidToken}`);

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Para acessar este recurso um token de autenticação válido deve ser enviado.");
    });
});