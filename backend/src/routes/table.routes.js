const { Router } = require("express");
const tableRoutes = Router();
const { GetAllTablesController, CreateTableController } = require("../controllers/index");

const { verifyFields, verifyToken, verifyIfIsAdmin } = require("../middlewares/index");


tableRoutes.get("/tables", GetAllTablesController.handle);
tableRoutes.post("/table", verifyFields, CreateTableController.handle);


module.exports = tableRoutes;