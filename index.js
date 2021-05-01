const mongoose = require('mongoose');
const app=require('./app');
const port=3900;

mongoose.connect('mongodb+srv://michaelr:michaelr@showpicapi.o6f1u.mongodb.net/db',
 {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
     console.log("Conecto")
     app.listen(port,()=>{
        console.log('Server running in http://localhost:'+port)
     });
 });
