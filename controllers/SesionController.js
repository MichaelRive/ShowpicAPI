const Sesion = require('../models/SesionModel');
const controller={
    save: (req,res) => {
      const {correo} = req.body
      try {
          if(correo.length > 0){
            const SesionNueva = new Sesion()
            SesionNueva.correo = correo
            SesionNueva.save((err,sesion) => {
                if(err){
                    return res.status(400).send({
                        status : 'Error de modelo'
                    })
                }if (!sesion){
                    return res.status(400).send({
                        status: 'Faltan datos'
                    })
                }else{
                    return res.status(200).send({
                        status: 'Sesion Iniciada'
                    })
                }
            })

          }else{
            return res.status(405).send({
                status: 'Faltan datos'
            })
          }
          
      } catch (error) {
          return res.status(402).send({
              status: 'error bb'
          })
      }
    },
    see: (req,res) => {
        Sesion.findOne({}).sort('_id').exec((err,sesion)=>{
            if(err){
                return res.status(400).send({
                    status: 'Error al buscar sesion'
                })
            }else{
                return res.status(200).send({
                    status: 'Sesion iniciada',
                    sesion
                })
            }
        })
    },
    delete:(req,res) => {
        const id = req.params.id
        if(id || id!=null){
            Sesion.deleteOne({_id:id}, (err,sesion) => {
                if(err){
                    return res.status(400).send({
                        status: 'Error de modelo'
                    })
                }if(!sesion){
                    return res.status(500).send({
                        status: 'Sesion no existe'
                    })
                }else{
                    return res.status(200).send({
                        status: 'Sesion eliminada',
                        sesion
                    })
                }
            })
        }else{
            return res.status(400).send({
                status: 'id no extraido'
            })
        }
    }
}
module.exports = controller;