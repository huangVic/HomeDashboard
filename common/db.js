var db = require("parse/node");

var config = {
    appId: process.env.PARSE_APP_ID || 'myAppId',
    key: process.env.PARSE_MASTER_KEY || 'myMasterKey'
};

console.log(" ==================================== ");
console.log(" Parse: " + config.appId + " | " + config.key);
console.log(" ==================================== ");


db.initialize(config.appId, config.key);
module.exports = db;
