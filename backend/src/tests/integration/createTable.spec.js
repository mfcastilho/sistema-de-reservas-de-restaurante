const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models");


describe("Create Table", ()=>{

    beforeAll(async () => {

        process.env.NODE_ENV = 'test';
        process.env.DATABASE_URL = 'sqlite::memory:';
    
        await sequelize.sync({ force: true });
    });
    
    afterAll(async () => {
        await sequelize.close();
    });

    it("It is possible to register a table", async ()=>{
        
        const response = await request(app).post("/api/v1/table").send({
            table_number: 1,
            capacity: 3,
            is_available: true
        });

        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("id");
        expect(response.body).toEqual({
            id: expect.any(String),
            table_number: expect.any(Number),
            capacity: expect.any(Number),
            is_available: expect.any(Boolean)
        })
    });

    it("It is not possible to register a table if any field is empty", async ()=>{
        const response = await request(app).post("/api/v1/table").send({
            table_number: 1,
            capacity: "",
            is_available: true
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Todos os campos são obrigatórios.");
    });
});