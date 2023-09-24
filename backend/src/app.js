const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const userRoutes = require("./routes/user.routes");
const tableRoutes = require("./routes/table.routes");
const reservationRoutes = require("./routes/reservation.routes");
 

app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", tableRoutes);
app.use("/api/v1", reservationRoutes);


module.exports = app;