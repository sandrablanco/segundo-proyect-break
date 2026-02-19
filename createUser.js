require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log('Connected to Mongo database');

    const userData = {
        username: 'Lucia',
        email: 'lusiafantastic@hotmail.com',
        password: 'lusifer2026',
        role: 'user'
    };

    // check username
    const userByUsername = await User.findOne({ username: userData.username });
    if (userByUsername) {
        console.log('Username already exists');
        return mongoose.connection.close();
    }

    // check email
    const userByEmail = await User.findOne({ email: userData.email });
    if (userByEmail) {
        console.log('Email already exists');
        return mongoose.connection.close();
    }

    // create new user
    const newUser = await User.create(userData);

    console.log('User created successfully!');
    console.log('Username:', newUser.username);
    console.log('Email:', newUser.email);
    console.log('Role:', newUser.role);
    console.log('Password (hashed):', newUser.password.substring(0, 20) + '...');//hash tiene hasta 60 caracteres pero solo se muestra hasta el 20

    mongoose.connection.close();
})
.catch(error => {
    console.error('Error:', error.message);
    mongoose.connection.close();
});