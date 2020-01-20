const router =require('express').Router();
const Note = require('../models/Note')

router.get('/users/singup',(req,res)=> {
    res.render('users/singup')
});

router.post('/users/singup', async (req,res)=> {
    const { user, password}= req.body;
    const errors = [];
    if(!user){
        errors.push({text: 'No ha registrado un usario'})
    }
    if(!password){
        errors.push({text: 'Falta Contraseña'})
    }
    if(errors.length > 0) {
        res.render('/', {
            errors,
            user,
            password
        });
    } else {
        const newUser = new Note({user, password});
        console.log(newUser);
        await newUser.save();
        res.redirect('/Ok');
    }
})

router.get('/users/login',(req,res)=> {
    res.render('users/login')
});

router.post('/users/login',(req,res)=> {
    console.log(req.body);
    res.send('Ok');
})
router.get('/Ok',(req,res)=> {
    res.send('Dato Obtenido')
});


module.exports=router;