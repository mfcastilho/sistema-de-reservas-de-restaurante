const verifyFields = require("./verifyFields");
const verifyIfEmailNotExists = require("./verifyIfEmailNotExists");
const verifyEmail = require("./verifyEmail");
const verifyLoginPassword = require("./verifyLoginPassword");
const verifyToken = require("./verifyToken");

module.exports = {
    verifyFields,
    verifyIfEmailNotExists,
    verifyEmail,
    verifyLoginPassword,
    verifyToken
}