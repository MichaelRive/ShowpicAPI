const express= require('express');
const UsuarioController = require('../controllers/UsuarioController');
const router=express.Router();
router.post('/guardar_usuario',UsuarioController.save);
router.get('/listar_usuarios',UsuarioController.get_usuarios);
router.get('/buscar_usuario/:id',UsuarioController.get_usuario_por_id);
router.delete('/eliminar_usuario/:id',UsuarioController.delete_usuario);
router.put('/actualizar_usuario/:id',UsuarioController.update_usuario);
module.exports=router;