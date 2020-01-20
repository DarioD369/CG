const express = require ('express');
const app=express();
const path = require('path');
const exphbs = require('express-handlebars');
const methodOver= require('method-override');
const session= require('express-session');

//Inicios
require('./database');

//Settings
app.set('port', process.env.PORT || 8080);//Crea la configuracion del puerto
app.set('views', path.join('C://Users//dario//CG//codes','views'));//Sirve para indicar donde esta la carpeta views los archivos de html y hbs
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));//Determinamos la configuracion de la plantilla de la pagina
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOver('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}))

//Global Variables

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));

//Static Files
app.use(express.static(path.join('C://Users//dario//CG//codes','public')))

//Server is listening_Indica si el codigo esta en el puerto
app.listen(app.get('port'),()=> {
    console.log('Server on port', app.get('port'));
});