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


// Middleware functions
const app = express()
app.use(cors({
    origin: 'http://localhost:5173', // replace with your frontend URL
    credentials: true,              // if your frontend requires cookies for auth
  }));  
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(indexRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Now listening on PORT: ${PORT}`))