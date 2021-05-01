// Cargar los modulos de js
const express = require('express');
// vamos a ejecutar el servidor
const app=express();
// Cargar los archivos y asignarles una ruta
const UsuarioUrl=require('./urls/UsuarioUrl');
// Middleware lo que traduce la peticion a json
app.use(express.urlencoded());
app.use(express.json());
// Cors permite que otras aplicaciones se conecten
// Añadir los prefijos
app.use('/',UsuarioUrl);
// Exportar los modulos
module.exports=app;