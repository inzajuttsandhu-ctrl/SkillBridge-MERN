const mongoose = require('mongoose');
require('dotenv').config();

const clearDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    await mongoose.connection.collection('users').deleteMany({});
    console.log('✅ All users deleted');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

clearDB();
