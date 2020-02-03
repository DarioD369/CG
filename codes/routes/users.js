const router =require('express').Router();
const Note = require('../models/Project');
const User = require('../models/User');
const passport = require('passport');

//Registro de Usuario
router.get('/users/signup',(req,res)=> {
    res.render('users/signup')
});

router.post('/users/signup', async (req,res)=> {
    const { user, email, password, confirm}= req.body;
    const errors = [];
    if(password != confirm){
        errors.push({text: 'Contraseñas no coinciden'})
    }
    if(!user){
        errors.push({text: 'No ha registrado un usario'})
    }
    if(!email){
        errors.push({text: 'No ha registrado un correo'})
    }
    if(!password){
        errors.push({text: 'Falta Contraseña'})
    }
    if(errors.length > 0) {
        res.render('users/signup', {
            errors,
            user,
            email,
            password,
            confirm
        });
    } else {
        const emailUser= await User.findOne({email: email});
        if(emailUser) {
            res.flash('error_msg', 'Usuario Regristrado');
            res.redirect('/user/signup');
        }
        const newUser = new User({user, email, password});
        console.log(newUser);
        newUser.password=await newUser.encryptPassword(password);
        await newUser.save();
        res.redirect('/');
        req.flash('success_msg','Estas registrado');
        res.redirect('/users/login');
    }
})

//Ingreso de Usuario
router.get('/users/login',(req,res)=> {
    res.render('users/login')
});

router.post('/users/login', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/login',
    failureFlash: true
}))

router.get('/user', async (req,res) => {
    const datas= await User.find({user: req.user.id}).sort({date: 'desc'});
    res.render('users/user.hbs', {datas})
});

router.get('/user/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})


module.exports=router;