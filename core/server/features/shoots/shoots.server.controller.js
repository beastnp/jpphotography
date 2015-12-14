var Shoot = require('./shoots.server.model');
var AWS = require('../../../../services/shoots.server.service');
var User = require('../users/users.server.model');

module.exports = {

    adminGetShoots: function (req, res) {
        Shoot.find().then(function (shoots) {
            res.send(shoots);
        });
    },

    userGetShoot: function (req, res) {
        Shoot.findById(req.params.id, function (err, shoot) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(shoot);
            }
        });
    },

    createShoot: function (req, res) {
        var newShoot = new Shoot(req.body);
        var userId = req.params.id;
        newShoot.save(function (err, result) {
            var newShootId = result._id;
//            User.update({
//                    "_id": req.params.id
//                }, {
//                    $push: {
//                        "shoots": req.body._id
//                    }
//                },
//                function (err, result) {
//                console.log(result);
//                    if (err) {
//                        res.status(500).send(err);
//                    } else {
//                        res.send(result);
//                    }
//                })
            res.send(result);
        });
    },

    adminUpdateShoot: function (req, res) {
        Shoot.findByIdAndUpdate(req.params.id, req.body, function (err, updatedShoot) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(updatedShoot);
            }
        });
    },

    adminDeleteShoot: function (req, res) {
        Shoot.findByIdAndRemove(req.params.id, function (err, deletedShoot) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(deletedShoot);
            }
        });
    }

};