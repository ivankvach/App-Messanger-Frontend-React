const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    }
});

var Test = mongoose.model('Test', productSchema);

module.exports = Test;