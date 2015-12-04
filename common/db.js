var db = require("parse/node");

var config = {
    appId: "xxx",
    key: "xxx"
};

console.log(" ==================================== ");
console.log(" Parse: " + config.appId + " | " + config.key);
console.log(" ==================================== ");


db.initialize(config.appId, config.key);
module.exports = db;
