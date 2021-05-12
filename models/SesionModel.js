const mongoose = require('mongoose');
const SesionSchema=mongoose.Schema({
    correo: String
});
module.exports= mongoose.model('Sesion',SesionSchema);