const express= require('express');
const PublicacionController = require('../controllers/PublicacionController');
const router=express.Router();
router.post('/guardar_publicacion',PublicacionController.save);
router.get('/listar_publicaciones',PublicacionController.get_publicaciones);
router.get('/listar_publicaciones_public',PublicacionController.get_publicaciones_public);
router.get('/buscar_publicacion/:id',PublicacionController.get_publicacion_por_id);
router.delete('/eliminar_publicacion/:id',PublicacionController.delete_publicacion);
router.put('/actualizar_publicacion/:id',PublicacionController.update_publicacion);
router.get('/buscar_publicacion_propietario/:id',PublicacionController.get_publicacion_por_propietario);
module.exports=router;