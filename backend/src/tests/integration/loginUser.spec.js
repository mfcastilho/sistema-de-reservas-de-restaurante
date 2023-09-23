const request = require("supertest");
const app = require("../../app");
const connection = require("../../models/index");
const truncate = require("./truncate");


describe("User Login", ()=>{

    afterAll(async ()=>{
        
        connection.sequelize.close();
    });

    // beforeEach(async () => {
    //     await truncate(connection.sequelize.models);
        
    // });

    it("É possível fazer login", async ()=>{

        await request(app).post("/api/v1/register/client").send({
            name: "davi",
            email: "davi@email.com",
            password: "123"
        });
        
        let response = await request(app).post("/api/v1/login").send({
            email: "davi@email.com",
	        password: "123"
        });

        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("token");
    });

    
});