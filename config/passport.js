const passport = require('passport')
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const db=   require('../db/db')
var config = require("./keyconfig");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

var params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};


module.exports = function () {
    var strategy = new Strategy(params, function (payload, done) {


        db.query('select * from user where phone=? AND password =?', [payload.email, payload.phone], (err, result) => {
            console.log(payload.phone);
            console.log(payload.password);
            if (err) {
                console.log(err);
                return done(new Error("User not found"), null);
            }

            else {
                if (result.length > 0) {
                    return done(null, {
                        id: result[0].email
                    });
                }
            }
        })

    });
    passport.use(strategy);
    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
};