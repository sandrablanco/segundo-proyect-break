const mongoose = require('mongoose');

//funcion para password de letras y numeros
function hasLetterAndNumber(password) {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasLetter && hasNumber;
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, /* se acepta que vaya en minusculas */
        trim: true /*quitar espacios al principio y al final*/,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 9,
        validate: {
            validator: hasLetterAndNumber,
            message: 'Password must contain letters and numbers',
        },
    },
},
{timestamps:true});

module.exports = mongoose.model('User', UserSchema, "tienda"); //guardo en coleccion test