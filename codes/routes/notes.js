// Rutas respecto a la obtencion de las rutas del historial

const router= require('express').Router(); //Para las rutas
const Note = require('../models/Project');//Indica la forma de los datos
const { isAuthenticated } = require('../helpers/auth'); //Si esta logeado continua con el proceso


router.get('/history', isAuthenticated, (req, res) => {
    res.render('notes/history');
});

router.post('/notes/history', isAuthenticated, async (req, res) => {
    const {title,route}=req.body;
    const errors=[];
    if(!title){
        errors.push({text: 'Falta un Nombre del proyecto'})
    }
    if(!title){
        errors.push({text:'Falta la ruta del proyecto'})
    }
    if(errors.length > 0){
        res.render('notes/history', {
            errors,
            title,
            route
        })
    }
    else{
        const newHistory = new Note({title, route});
        newHistory.user = req.user.id;
        console.log(newHistory);
        await newHistory.save();
        req.flash('success_msg', 'Proyecto Agregado');
        res.redirect('/user');
    }  
});

router.get('/user', async (req,res) => {
    const datas= await User.find({user: req.user.id}).sort({date: 'desc'});
    res.render('users/user.hbs', {datas})
});

router.put('/notes/edit/:id', async (req, res)=> {
    const {title,route}=req.body;
    await Note.findByIdAndUpdate(req.params.id, {title,route});//Metodo para buscar apartir del id
    req.flash('success_msg', 'Proyecto Actualizado')
    res.redirect('/history');
});

router.delete('/notes/delete/:id', async (req, res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Proyecto Eliminado')
    res.redirect('/notes')
})


module.exports= router;