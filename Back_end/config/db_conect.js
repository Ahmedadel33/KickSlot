const mongoose = require('mongoose');

const db_connection = async () => {  
  try {
     await mongoose.connect(process.env.DB_URL); 
    console.log(" MongoDB Connected Successfully");
  } catch (error) {
    console.log(" MongoDB Connection Failed:", error.message);
  }
}

module.exports = db_connection;  