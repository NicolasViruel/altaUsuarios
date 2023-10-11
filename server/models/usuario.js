const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    nombre:{
        type: String,
        maxLength: 50,
        minLength: 4,
        require: true
    },
    apellido:{
        type: String,
        maxLength: 50,
        minLength: 3,
        require: true
    },
    fechaNacimiento:{
        type: Date,
        require: true
    },
    telefono:{
        type: Number,
        maxLength: 10,
        minLength: 6,
        require
    },
    email:{
        type: String,
        require: true,
        unique: true,
    }
});

module.exports = mongoose.model("siliceUsuarios" , UserSchema)

