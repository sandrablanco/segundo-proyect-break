const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//funcion para password de letras y numeros
function hasLetterAndNumber(password) {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasLetter && hasNumber;
}

const UserSchema = new mongoose.Schema({
    username: {
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
        match: [/^\S+@\S+\.\S+$/, 'Email no válido']  // Validación de email
    },
    password: {
        type: String,
        required: true,
        minlength: 9,
        validate: {
            validator: hasLetterAndNumber,
            message: 'Password must contain letters and numbers',
        }
    },
    role: {
        type: String,
        enum: [ 'admin', 'user'],
        default: 'admin'
    }
},
{timestamps:true});
//middleware para encriptar o hashear la contraseña antes de guardarla en la base de datos
UserSchema.pre('save', async function (next) {
    //solo encripta si la contra fue modificada
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);  //salt valor aleatorio q se añade antes de cifrarla 2users con misma contra no tengan mismo hash
        this.password = await bcrypt.hash(this.password, salt); //hash la contraseña con el salt
        next();
     } catch (error) {
        next(error);
    }
});

//method compare password for login
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password); //compara la contraseña ingresada con la almacenada en la base de datos
};


module.exports = mongoose.model('User', UserSchema, 'users'); 