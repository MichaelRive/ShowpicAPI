const express= require('express');
const SesionController = require('../controllers/SesionController');
const router=express.Router();
router.post('/guardar_sesion',SesionController.save);
router.get('/ver_sesion',SesionController.see);
router.delete('/eliminar_sesion/:id',SesionController.delete);
module.exports=router;