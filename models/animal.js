const { Schema, model } = require('mongoose');

const AnimalSchema = Schema({

    mascota: {
        type: String,
        required: [true, 'El tipo de animal que desea es obligatorio']
    },

    raza: {
        type: String,
        required: [true, 'El nombre de la raza es obligatorio']
    },

    edad: {
        type: String,
        required: [true, 'La edad del animal que busca es obligatoria']
    },

    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Animal', AnimalSchema);