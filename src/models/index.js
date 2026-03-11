const mongoose = require('mongoose');
const User = require('./User');
const UserPreference = require('./UserPreference');
const UserActionLog = require('./UserActionLog');
const Department = require('./department');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = {
    connectDB,
    User,
    UserPreference,
    UserActionLog,
    Department
};