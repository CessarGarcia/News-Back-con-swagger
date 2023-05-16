const mongoose = require('mongoose');

const noticiaShema = mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,        
    },
    descripcion:{
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    pais: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('NOTICIA', noticiaShema);