// Rutas respecto a la obtencion de las rutas del historial

const router= require('express').Router(); //Para las rutas

router.get('/history', (req, res) => {
    res.send('Sistemas Pasados');
});

module.exports= router;