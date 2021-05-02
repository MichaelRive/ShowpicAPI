const mongoose = require('mongoose');
const PublicacionSchema=mongoose.Schema({
    url: String,
    fecha_publicacion: {type: Date, default: Date.now},
    propietario: String,
    descripcion: String,
    tag: String,
    es_publico: Boolean
});
module.exports= mongoose.model('publicaciones',PublicacionSchema);