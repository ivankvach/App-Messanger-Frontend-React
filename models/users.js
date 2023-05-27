const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
       //[] unique: true
    },
    friends: {
        type: [String],
        required: false
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);

// var User = mongoose.model('User', userSchema);

// module.exports = User;