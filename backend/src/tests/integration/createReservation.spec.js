const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models");


describe("Create Reservation", () => {
    let authToken; 

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

    });

    afterAll(async () => {
        await sequelize.close();
    });


    it('It is possible to create a reservation', async () => {
        const response = await request(app)
        .post("/api/v1/reservation")
        .set('Authorization', `Bearer ${authToken}`) 
        .send({
            table_number: 1,
            date: "2023-10-03",
            hour: "20:30"
        });
        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("id");
    });

    it("It is not possible to make a reservation because the authentication token is invalid", async ()=>{
        const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1ZDkyMTNjLWU0YjEtNGYzNy04OGI3LWE3N2Y5M2FmMTg4MSIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2OTU1MTEwNzMsImV4cCI6MTY5NTU5NzQ3M30.F51hmqZ18rl-3I60r_kuTpoGyaAL0ly9xmtPnIcz8Z";

        const response = await request(app)
        .post("/api/v1/reservation")
        .set('Authorization', `Bearer ${invalidToken}`) 
        .send({
            table_number: 1,
            date: "2023-09-29",
            hour: "20:30"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Para acessar este recurso um token de autenticação válido deve ser enviado.");
    });

    it("It is not possible to make a reservation because the date and/or time for the reservation have already passed", async ()=>{
        const response = await request(app)
        .post("/api/v1/reservation")
        .set('Authorization', `Bearer ${authToken}`) 
        .send({
            table_number: 1,
            date: "2023-09-23",
            hour: "20:30"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Não foi possível realizar a reserva. A data e/ou a hora da reserva já passaram.");
    });

    it("It is not possible to make a reservation because the requested time is not a valid time", async ()=>{
        const response = await request(app)
        .post("/api/v1/reservation")
        .set('Authorization', `Bearer ${authToken}`) 
        .send({
            table_number: 1,
            date: "2023-09-29",
            hour: "17:00"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Reservas permitidas apenas das 18:00 até 23:59, exceto aos domingos.");
    });

    it("It is not possible to make a reservation because the requested day is not a valid day", async ()=>{
        const response = await request(app)
        .post("/api/v1/reservation")
        .set('Authorization', `Bearer ${authToken}`) 
        .send({
            table_number: 1,
            date: "2023-10-01",
            hour: "20:00"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Reservas não são permitidas aos domingos.");
    });

    it("It is not possible to make a reservation because the requested table does not exist in our system", async ()=>{
        const response = await request(app)
        .post("/api/v1/reservation")
        .set('Authorization', `Bearer ${authToken}`) 
        .send({
            table_number: 16,
            date: "2023-10-03",
            hour: "20:00"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual(`Não existe no nosso sistema a mesa de número ${16}.`);
    });

    it("It is not possible to make a reservation because the requested table has already been reserved for that time", async ()=>{
        await request(app)
        .post("/api/v1/reservation")
        .set('Authorization', `Bearer ${authToken}`) 
        .send({
            table_number: 1,
            date: "2023-10-03",
            hour: "20:00"
        });

        const response = await request(app)
        .post("/api/v1/reservation")
        .set('Authorization', `Bearer ${authToken}`) 
        .send({
            table_number: 1,
            date: "2023-10-03",
            hour: "20:00"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual(`A mesa ${1} já está reservada para este horário.`);
    });


    it("It is not possible to make a reservation if any field is empty", async ()=>{
        const response = await request(app)
        .post("/api/v1/reservation")
        .set('Authorization', `Bearer ${authToken}`) 
        .send({
            table_number: 1,
            date: "",
            hour: "20:00"
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Todos os campos são obrigatórios.");
    });
});
