const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/myFriendsApi');

// Export connection 
module.exports = mongoose.connection;
