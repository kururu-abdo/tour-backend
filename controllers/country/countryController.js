
const db = require("../../config/db.config");
const users = db.users;

exports.findAll = (req, res) => {
    users.findAll().then(users => {
        // Send all customers to Client
        res.send(users);
    });
};