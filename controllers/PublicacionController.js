const Publicacion = require('../models/PublicacionModel');
const fs = require('fs');
const path = require('path');
const controller = {
    save: (req, res) => {
        /*
        1. Recoger los datos
        2. Validar los datos
        3. Crear el objeto
        4. Guardar el objeto
        5. Se devuelve una respuesta
        */
        const { url, propietario, descripcion, tag, es_publico } = req.body;
        try {
            if (url.length > 0 && propietario.length > 0 && descripcion.length > 0 && tag.length > 0 && es_publico != null) {
                const PublicacionNuevo = new Publicacion();
                PublicacionNuevo.url = url;
                PublicacionNuevo.propietario = propietario;
                PublicacionNuevo.descripcion = descripcion;
                PublicacionNuevo.tag = tag;
                PublicacionNuevo.es_publico = es_publico;
                PublicacionNuevo.save((err, publicacion) => {
                    if (err) {
                        return res.status(400).send({
                            status: 'Error, contacte al administrador'
                        })
                    } if (!publicacion) {
                        return res.status(400).send({
                            status: 'Faltan datos'
                        })
                    } else {
                        return res.status(200).send({
                            status: 'Publicacion registrada correctamente'
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
    }, get_publicaciones: (req, res) => {
        Publicacion.find({}).sort('_id').exec((err, publicaciones) => {
            if (err) {
                return res.status(400).send({
                    status: 'Error al buscar la publicacion'
                })
            }
            return res.status(200).send({
                publicaciones
            })
        })
    },
    get_publicaciones_public: (req, res) => {
        Publicacion.find({ es_publico: true }).sort('_id').exec((err, publicaciones) => {
            if (err) {
                return res.status(400).send({
                    status: 'Error al buscar la publicacion'
                })
            } else {

                return res.status(200).send({
                    publicaciones
                })
            }

        })
    },
    get_publicacion_por_id: (req, res) => {
        // Recoger el id de la URL
        const id = req.params.id;
        if (!id || id == null) {
            return res.status(500).send({
                status: 'Id no extraido correctamente'
            })
        } else {
            // Hacemos la busqueda
            Publicacion.findById(id, (err, publicacion) => {
                if (err) {
                    return res.status(500).send({
                        status: 'Publicacion no encontrada'
                    })
                }
                if (!publicacion) {
                    return res.status(500).send({
                        status: 'No existe la publicacion'
                    })
                }
                return res.status(200).send({
                    status: 'Publicacion encontrada',
                    publicacion
                })
            })
        }
    },
    get_publicacion_por_propietario:(req,res)=>{
        const id= req.params.id;
        if(!id || id==null){
            return res.status(500).send({
                status: 'Propietario no extraido correctamente'
            })
        }else{
            Publicacion.find({propietario: id}).sort('_id').exec((err,publicaciones)=>{
                if(err){
                    return res.status(400).send({
                        status: 'Error al buscar publicacion'
                    })
                }else{
                    return res.status(200).send({
                        status: 'Busqueda correcta',
                        publicaciones
                    })
                }
            })
        }
    },

    delete_publicacion:(req,res)=>{
        const id=req.params.id;
        if (!id || id==null){
            return res.status(500).send({
                status: 'Id no extraido correctamente'
            })
        } else {
            Publicacion.deleteOne({ _id: id }, (err, publicacion) => {
                if (err) {
                    return res.status(500).send({
                        status: 'Publicacion no encontrada'
                    })
                }
                if (!publicacion) {
                    return res.status(500).send({
                        status: 'No existe la publicacion'
                    })
                }
                return res.status(200).send({
                    status: 'Publicacion eliminada',
                    publicacion
                })
            })
        }
    },
    update_publicacion: (req, res) => {
        // 1. Recoger los datos
        // 2. Validar los datos
        // 3. Buscar y actualizar
        const { url, propietario, descripcion, tag, es_publico } = req.body;
        const id = req.params.id;
        try {
            if (url.length > 0 && propietario.length > 0 && descripcion.length > 0 && tag.length > 0 && es_publico != null) {
                Publicacion.updateOne({ _id: id }, { url, propietario, descripcion, tag, es_publico }, { new: true }, (err, publicacion) => {
                    if (err) {
                        return res.status(500).send({
                            status: 'No se encontró la publicacion'
                        })
                    }
                    return res.status(200).send({
                        status: 'Publicacion actualizada',
                        publicacion
                    })
                })
            } else {

            }
        } catch (error) {
            console.log('Contacte al administrador')
        }
    }, upload: (req, res) => {
        let file_name = "imagen no encontrada";
        if (!req.files) {
            return res.status(400).send({
                status: 'error',
                message: file_name
            })
        } else {
            const file_path = req.files.file0.path;
            const file_split = file_path.split('\\');
            const file_name = file_split[2];
            const file_extension = file_name.split('.')[1];
            if (file_extension != 'png' && file_extension != 'jpg' && file_extension != 'jpeg' && file_extension != 'gif') {
                return res.status(400).send({
                    status: 'error',
                    message: 'not valid extension'
                })
            } else {
                const id = req.params.id;
                const { descripcion, tag, es_publico } = req.body;
                try {
                    if (descripcion.length > 0 && tag.length > 0 && es_publico != null) {
                        const PublicacionNuevo = new Publicacion();
                        PublicacionNuevo.url = file_name;
                        PublicacionNuevo.propietario = id;
                        PublicacionNuevo.descripcion = descripcion;
                        PublicacionNuevo.tag = tag;
                        PublicacionNuevo.es_publico = es_publico;
                        console.log(PublicacionNuevo);
                        PublicacionNuevo.save((err, publicacion) => {
                            if (err) {
                                return res.status(400).send({
                                    status: 'Error, contacte al administrador'
                                })
                            } if (!publicacion) {
                                return res.status(400).send({
                                    status: 'Faltan datos'
                                })
                            } else {
                                return res.status(200).send({
                                    status: 'Publicacion registrada correctamente'
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
            }
        }
    }
}
module.exports = controller;