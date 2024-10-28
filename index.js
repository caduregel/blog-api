import mongoose from 'mongoose'
import express from 'express'
import 'dotenv/config'
import { routes } from './routes/indexRouter.js';

const app = express()
mongoose.connect(process.env.DATABASE_CONNECTION_URL)

app.use(express.urlencoded({ extended: true }));
app.use("/",routes)

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => { `Now listening on ${PORT}!` })