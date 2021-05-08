const validator = require('validator');
const Usuario = require('../models/UsuarioModel');
const controller = {
    datosusuarios: (req, res) => {
        console.log("Soy el controlador fiuuuuuu");
        return res.status(200).send({
            usuario: 'wenas',
            correo: 'holamor@gmail.com',
            contrasena: '12345',
            nombre: 'Cristo Rey',
            url_foto_perfil: 'hola.png'
        })
    },
    save: (req, res) => {
        /*
        1. Recoger los datos
        2. Validar los datos
        3. Crear el objeto
        4. Guardar el objeto
        5. Se devuelve una respuesta
        */
        const { usuario, correo, contrasena, nombre, url_foto_perfil } = req.body;
        try {
            if (usuario.length > 0 && correo.length > 0 && contrasena.length > 0 && nombre.length > 0 && validator.isEmail(correo)) {
                const UsuarioNuevo = new Usuario();
                UsuarioNuevo.usuario = usuario;
                UsuarioNuevo.correo = correo;
                UsuarioNuevo.contrasena = contrasena;
                UsuarioNuevo.nombre = nombre;
                UsuarioNuevo.url_foto_perfil = url_foto_perfil;
                UsuarioNuevo.save((err, usuario) => {
                    if (err) {
                        return res.status(400).send({
                            status: 'Usuario o correo ya registrado'
                        })
                    } if (!usuario) {
                        return res.status(400).send({
                            status: 'Faltan datos'
                        })
                    } else {
                        return res.status(200).send({
                            status: 'Usuario registrado correctamente'
                        })
                    }
                })
            } else {
                return res.status(401).send({
                    status: 'Faltan datos'
                })
            }
        } catch (error) {
            console.log("Error");
            return res.status(401).send({
                status: 'F'
            })
        }


    },
    get_usuarios: async(req, res) => {
        Usuario.find({}).sort('_id').exec((err, usuarios) => {
            if (err) {
                return res.status(400).send({
                    status: 'Error al buscar usuarios'
                })
            }
            return res.status(200).send({
                usuarios
            })
        })
    },
    get_usuario_por_correo: async(req,res) => {
        const correo = req.params.correo
        Usuario.findOne({correo: correo}).exec((err,usuario)=>{
            if(err){
                return res.status(400).send({
                    status: 'Error al buscar usuario'
                })
            }else{
                return res.status(200).send({
                    status: 'Usuario encontrado',
                    usuario
                })
            }
        })
    },

    get_usuario_por_id: (req, res) => {
        // Recoger el id de la URL
        const id = req.params.id;
        if (!id || id == null) {
            return res.status(500).send({
                status: 'Id no extraido correctamente'
            })
        } else {
            // Hacemos la busqueda
            Usuario.findById(id, (err, usuario) => {
                if (err) {
                    return res.status(500).send({
                        status: 'Usuario no encontrado'
                    })
                }
                if (!usuario) {
                    return res.status(500).send({
                        status: 'No existe el usuario'
                    })
                }
                return res.status(200).send({
                    status: 'Usuario encontrado',
                    usuario
                })
            })
        }
    },
    delete_usuario: (req, res) => {
        const id = req.params.id;
        if (!id || id == null) {
            return res.status(500).send({
                status: 'Id no extraido correctamente'
            })
        } else {
            Usuario.deleteOne({ _id: id }, (err, usuario) => {
                if (err) {
                    return res.status(500).send({
                        status: 'Usuario no encontrado'
                    })
                }
                if (!usuario) {
                    return res.status(500).send({
                        status: 'No existe el usuario'
                    })
                }
                return res.status(200).send({
                    status: 'Usuario eliminado',
                    usuario
                })
            })
        }
    },
    update_usuario: (req, res) => {
        // 1. Recoger los datos
        // 2. Validar los datos
        // 3. Buscar y actualizar
        const { usuario, correo, contrasena, nombre, url_foto_perfil } = req.body;
        const id = req.params.id;
        try {
            if (usuario.length > 0 && correo.length > 0 && contrasena.length > 0 && nombre.length > 0) {
                Usuario.updateOne({ _id: id }, { usuario, correo, contrasena, nombre, url_foto_perfil }, { new: true }, (err, usuario) => {
                    if (err) {
                        return res.status(500).send({
                            status: 'No se encontró el usuario'
                        })
                    }
                    return res.status(200).send({
                        status: 'Usuario actualizado',
                        usuario
                    })
                })
            } else {

            }
        } catch (error) {
            console.log('Contacte al administrador')
        }
    }
}
module.exports = controller;