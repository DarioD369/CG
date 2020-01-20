// La conecion a la base de datos
const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/UsuariosHistoria', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})  .then(db => console.log('DB is Connected'))
    .catch(err => console.error(err));