var     mongoose = require('mongoose')
//    ,   bcrypt = require('bcrypt-nodejs')

    , Schema = mongoose.Schema;

var User = Schema({

        facebookId: Number
    ,   clientName: String
    ,   email: String
    ,   admin: {
            type: Boolean,
            default: false
        }
    ,   shoots: [{ 
            type: Schema.Types.ObjectId
        ,   ref: 'Shoot'
    }]
});

//User.methods.generateHash = function(password) {
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//};
//                  
//User.methods.validPassword = function(password) {
//    return bcrypt.compareSync(password, this.local.password);
//};
//
module.exports = mongoose.model('User', User);