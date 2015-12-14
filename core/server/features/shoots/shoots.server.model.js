var     mongoose = require('mongoose')
    ,   Schema = mongoose.Schema;

var Shoot = Schema({
    
        clientName: String
    ,   createdAt: {type: Date, default: Date.now}
    ,   shootName: String
    ,   style: {type: String, enum: ['Engagement', 'Senior/Portrait', 'Newborn', 'Family', 'Bridal/Groomal']}
    ,   photos: []
    ,   notes: String
    
});

module.exports = mongoose.model('Shoot', Shoot);