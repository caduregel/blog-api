const passport = require('../config/passport.config')

const confirmUser = passport.authenticate("jwt", { session: false })


const confirmRegister = async (req, res, next) => {
    if (req.body.create_user_key !== process.env.CREATE_USER_KEY) {
        res.status(401).json({
            Error: "You are not permitted to create an account"
        })
    } else {
        next()
    }
}

module.exports = { confirmUser, confirmRegister }