const mongoose = require('mongoose');
const UsuarioSchema=mongoose.Schema({
    usuario: {
        type: String,
        unique: true
    },
    correo: {
        type: String,
        unique: true
    },
    contrasena: String,
    nombre: String,
    url_foto_perfil: String
});
module.exports= mongoose.model('usuarios',UsuarioSchema);