// Rutas respecto a la obtencion de las rutas del historial

const router= require('express').Router(); //Para las rutas
const Note = require('../models/Project');//Indica la forma de los datos
const { isAuthenticated } = require('../helpers/auth'); //Si esta logeado continua con el proceso


//Mostrar Proyectos
router.get('/projects/history', isAuthenticated, async (req,res) => {
    const datas= await Note.find({user: req.user.id}).sort({date: 'desc'});
    res.render('notes/history.hbs', {datas})
});

//Seccion para agregar proyectos a la base de Datos Project -------Lo realiza por medio de la pagina por el metodo POST
router.post('/projects/history/edit', isAuthenticated, async (req, res) => {
    const {title,route}=req.body;
    const errors=[];
    if(!title){
        errors.push({text: 'Falta un Nombre del proyecto'})
    }
    if(!title){
        errors.push({text:'Falta la ruta del proyecto'})
    }
    if(errors.length > 0){
        res.render('notes/add', {
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
        res.redirect('/projects/history');
    }  
});

//Realizar modifiaciones en la ruta del proyecto
router.put('/notes/edit/:id', isAuthenticated, async (req, res)=> {
    const {title,route}=req.body;
    await Note.findByIdAndUpdate(req.params.id, {title,route});//Metodo para buscar apartir del id y realizar modificaciones
    req.flash('success_msg', 'Proyecto Actualizado')
    res.redirect('/projects/history');
});

//Borrar Proyecto
router.delete('/notes/delete/:id', isAuthenticated, async (req, res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Proyecto Eliminado')
    res.redirect('/projects/history')
})


module.exports= router;