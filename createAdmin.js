require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
mongoose.connect(process.env.MONGO_URI)
.then (async () => {
    await User.create({
        username: 'admin',
        email: 'admin@gmail.com',
        password: '1234admin',
        role: 'admin'
    });
    console.log('Admin has been created successfully');
    process.exit();
})
.catch(error => console.log(error));