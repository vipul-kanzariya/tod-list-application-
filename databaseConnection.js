/**
 * Author: Kanzariya vipul
 * Program: MongoDB Connection
 */

const mongoose = require('mongoose');


async function DbConnection() {
    const DB_URL = process.env.URL;

    try {
        await mongoose.connect(DB_URL);
        console.log('DB connected successfully');
    } catch (error) {
        console.error('Connection Error:', error.message);
    }
}

module.exports = DbConnection;
