const verifyFields = require("./verifyFields");
const verifyIfEmailNotExists = require("./verifyIfEmailNotExists");
const verifyEmail = require("./verifyEmail");
const verifyLoginPassword = require("./verifyLoginPassword");
const verifyToken = require("./verifyToken");
const verifyAdminRegistration = require("./verifyAdminRegistration");
const checkTableAvailability = require("./checkTableAvailability");
const validationReservation = require("./validationReservation");

module.exports = {
    verifyFields,
    verifyIfEmailNotExists,
    verifyEmail,
    verifyLoginPassword,
    verifyToken,
    verifyAdminRegistration,
    checkTableAvailability,
    validationReservation
}