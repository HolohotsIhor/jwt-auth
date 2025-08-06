import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './router/index.js';

dotenv.config();

const PORT = process.env.PORT || 7000;
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const start = async() => {
    try {
        await mongoose.connect(process.env.DB_URL);
        app.listen(PORT, () => {console.log(`The server starts on port ${process.env.PORT}`);})
    } catch (e) {
        console.log(e);
    }
}

start();
