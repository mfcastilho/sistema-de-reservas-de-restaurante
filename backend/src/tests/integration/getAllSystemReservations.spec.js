const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models");

describe("Get All User Reservations", ()=>{
    let authTokenAdmin;
    let authTokenClient;


    beforeAll(async () => {

        process.env.NODE_ENV = 'test';
        process.env.DATABASE_URL = 'sqlite::memory:';

        await sequelize.sync({ force: true });


        await request(app).post("/api/v1/table").send({
            table_number: 1,
            capacity: 3,
            is_available: true
        });

        await request(app).post("/api/v1/table").send({
            table_number: 2,
            capacity: 2,
            is_available: true
        });

        await request(app).post("/api/v1/table").send({
            table_number: 3,
            capacity: 4,
            is_available: true
        });


        const admin = await request(app).post("/api/v1/register/admin").send({
            name: "João",
            email: "joao@email.com",
            password: "123"
        });

        const adminLogged = await request(app).post("/api/v1/login").send({
            email: "joao@email.com",
            password: "123"
        });

        authTokenAdmin = adminLogged.body.token;


        await request(app).post("/api/v1/register/client").send({
            name: "Amanda",
            email: "amanda@email.com",
            password: "123"
        });

        const clientLogged = await request(app).post("/api/v1/login").send({
            email: "amanda@email.com",
            password: "123"
        });

        authTokenClient = clientLogged.body.token;
        

        await request(app)
        .post("/api/v1/reservation")
        .set('Authorization', `Bearer ${authTokenClient}`) 
        .send({
            table_number: 1,
            date: "2023-09-29",
            hour: "20:00"
        });

        await request(app)
        .post("/api/v1/reservation")
        .set('Authorization', `Bearer ${authTokenClient}`) 
        .send({
            table_number: 2,
            date: "2023-10-02",
            hour: "20:00"
        });

        await request(app)
        .post("/api/v1/reservation")
        .set('Authorization', `Bearer ${authTokenClient}`) 
        .send({
            table_number: 3,
            date: "2023-10-03",
            hour: "20:00"
        });
        


    });

    afterAll(async () => {
        await sequelize.close();
    });


    it("It is possible to list all the reservations in the system", async ()=>{
        const response = await request(app)
        .get("/api/v1/admin/all-reservations")
        .set('Authorization', `Bearer ${authTokenAdmin}`);

        expect(response.ok).toBeTruthy();
        
        response.body.forEach( reservation =>{
            expect(reservation).toEqual({
                id: expect.any(String),
                id_user: expect.any(String),
                id_table: expect.any(String),
                date_hour_reservation: expect.any(String),
                table: {
                    id: expect.any(String),
                    table_number: expect.any(Number),
                    capacity: expect.any(Number),
                    is_available: expect.any(Boolean),
                },
                user: {
                    id: expect.any(String),
                    name: expect.any(String),
                    email: expect.any(String),
                    role: expect.any(String),
                },
            });
        });
    });


    it("It is not possible to list all the reservations in the system because the authentication token is invalid", async ()=>{
        const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1ZDkyMTNjLWU0YjEtNGYzNy04OGI3LWE3N2Y5M2FmMTg4MSIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2OTU1MTEwNzMsImV4cCI6MTY5NTU5NzQ3M30.F51hmqZ18rl-3I60r_kuTpoGyaAL0ly9xmtPnIcz8";

        const response = await request(app)
        .get("/api/v1/admin/all-reservations")
        .set('Authorization', `Bearer ${invalidToken}`);

        expect(response.ok).toBeFalsy()
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Para acessar este recurso um token de autenticação válido deve ser enviado.");
    });


    it("It is not possible to list all the reservations in the system because the user is not an administrator", async ()=>{
        const response = await request(app)
        .get("/api/v1/admin/all-reservations")
        .set('Authorization', `Bearer ${authTokenClient}`);

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Acesso negado");
    });

});