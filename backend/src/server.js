const express = require("express");
const app = express();

const userRoutes = require("./routes/user.routes");
const tableRoutes = require("./routes/table.routes");

app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", tableRoutes);


module.exports = app;