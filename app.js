// Cargar los modulos de js
const express = require('express');
//const cors = require('cors');
// vamos a ejecutar el servidor
const app=express();
// Cargar los archivos y asignarles una ruta
const UsuarioUrl=require('./urls/UsuarioUrl');
const PublicacionUrl=require('./urls/PublicacionUrl');
//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// Middleware lo que traduce la peticion a json
app.use(express.urlencoded());
app.use(express.json());
// Añadir los prefijos
app.use('/usuarios',UsuarioUrl);
app.use('/publicaciones',PublicacionUrl);
// Exportar los modulos
module.exports=app;