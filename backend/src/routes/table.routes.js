const { Router } = require("express");
const tableRoutes = Router();
const { GetAllTablesController } = require("../controllers/index");


tableRoutes.get("/tables", GetAllTablesController.handle);


module.exports = tableRoutes;