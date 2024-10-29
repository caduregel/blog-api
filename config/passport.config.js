const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const { User } = require('../model/userSchema');

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};
const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new Strategy(opts, async (payload, done) => {
        try {
            const user = await User.findById(payload.id);
            if (user) return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

module.exports = passport