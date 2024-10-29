const expressAsyncHandler = require("express-async-handler");
const { User } = require("../model/userSchema");
const { hashPassword, comparePassword } = require("../helpers/hashHelper");
const jwt = require('jsonwebtoken');
// var cookieParser = require('cookie-parser')


const expirationtimeInMs = process.env.JWT_EXPIRATION_TIME
const secret = process.env.JWT_SECRET

const registerController = expressAsyncHandler(async (req, res, next) => {
    const password = await hashPassword(req.body.password)
    const newUser = new User({
        username: req.body.username,
        password: password
    })
    await newUser.save()
    return res.status(201).json({
        user: newUser
    })
})

const logInController = expressAsyncHandler(async (req, res, next) => {
    try {
        //check if user exists
        const userExists = await User.findOne({ username: req.body.username });
        if (!userExists)
            return res.status(400).json({ message: "user does not exist" });

        // check if password is correct
        if (!comparePassword(req.body.password, userExists.password,))
            return res.status(400).json({ message: "incorrect password" });

        // generate access token
        const payload = {
            id: userExists._id,
            expiration: Date.now() + parseInt(expirationtimeInMs)
        }
        const token = jwt.sign(JSON.stringify(payload), secret)
        res.cookie('jwt',
            token, {
            httpOnly: true,
            secure: true //--> SET TO TRUE ON PRODUCTION
        })
            .status(200)
            .json({
                token: token
            })
    } catch (error) {
        console.log(error);
        next(error);
    }
})



module.exports = { registerController, logInController }