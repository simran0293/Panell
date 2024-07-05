const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const router = require('./routes');
const cookiesParser = require('cookie-parser')

require('dotenv').config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 5000;

// Routes
app.get('/', (request, response) => {
    response.json({
        message: "Server running at " + PORT
    });
});

//api endpoints
app.use('/api',router);


connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("Server running at"+ PORT)
})
}).catch(error => {
    console.error("Failed to connect to the database:", error);
    // Handle the error here
});

