if( process.env.NODE_ENV == 'production') {
    module.exports = require('C://Users//dario//CG//codes/config/keys_prod');
} else {
    module.exports = require('C://Users//dario//CG//codes/config/keys_dev');
}

