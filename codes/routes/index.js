const router =require('express').Router();
const Note = require('../models/Project');//Indica la forma de los datos


router.get('/', (req, res)=> {
    res.render('index.hbs');
}); //Pagina Principal

router.get('/prueba', (req, res) => {
    res.render('about.hbs');
})//Visita en /about

module.exports=router;