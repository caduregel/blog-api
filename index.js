require('dotenv').config()
const express = require('express');
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


// Middleware functions
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(indexRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Now listening on PORT: ${PORT}`))