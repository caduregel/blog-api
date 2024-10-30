require('dotenv').config()
const express = require('express');
const cors = require('cors');
const indexRouter = require('./routes/indexRouter');
const { default: mongoose } = require("mongoose");
const cookieParser = require('cookie-parser');

// Connect to mongo db
mongoose.connect(process.env.DATABASE_CONNECTION_URL).then(() => {
    console.log("successfully connected to mongodb");
})
    .catch((err) => {
        console.log(err);
    });
    const allowedOrigins = [
        'https://blog-frontend-lime-tau.vercel.app',
        'https://another-frontend-url.com',
        'http://localhost:3000', // Example for local development
    ];

// Middleware functions
const app = express()
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    credentials: true,              // if your frontend requires cookies for auth
}));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(indexRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Now listening on PORT: ${PORT}`))