const router =require('express').Router();


router.get('/', (req, res)=> {
    res.render('index.hbs');
}); //Pagina Principal
router.get('/prueba', (req, res) => {
    res.render('about.hbs');
})//Visita en /about

module.exports=router;