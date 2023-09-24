const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models");



describe("Get All Tables", ()=>{

    // let authToken;

    beforeAll(async () => {

        process.env.NODE_ENV = 'test';
        process.env.DATABASE_URL = 'sqlite::memory:';
    
        await sequelize.sync({ force: true });

               
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

    it("It is possible to list all the tables in the system", async ()=>{
        const response = request(app)
        .get("/api/v1/tables")

        expect(response.ok).toBeTruthy();
    });


});