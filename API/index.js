import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import route from "./Router/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config()

const app = express();

// Middleware to parse JSON
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(route);

// Root route
app.get('/', (req, res) => {
    res.send('Hello');
});



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server listening on http://127.0.0.1:${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Connection failed: ', error);
    });