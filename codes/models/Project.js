const mongoose = require('mongoose');
const { Schema }= mongoose;

const UserSchema = new Schema({
    name: {type: String, required: true},
    route:{type: String, required: true},
    user:{type: String},
    date: {type: Date, default: Date.now},
})

module.exports = mongoose.model('Project', UserSchema);