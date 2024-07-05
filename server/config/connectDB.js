require('dotenv').config();

const mongoose = require('mongoose');

async function connectDB() {
    try {
        // console.log('Attempting to connect to MongoDB...');
        // console.log('MONGO_URI:', process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI, {

         
        });

        const connection = mongoose.connection;

        connection.once('open', () => {
            console.log("Connected to DB");
        });

        connection.on('error', (error) => {
            console.error("Something is wrong with MongoDB", error);
        });
        
    } catch (error) {
        console.error('Something is wrong', error); 
    }
}

module.exports = connectDB;
