var User = require('./users.server.model');

module.exports = {
    
    adminGetUsers: function(req, res) {
        User.find().populate('shoots').exec().then(function(users, err) {
            if(err) {
                res.status(500).send(err);
            } else {
            res.send(users);
            }
        });
    },
    
    userGetUser: function(req, res) {
        User.findById(req.params.id).populate('shoots').exec(function(err, user) {
            if(err) {
                res.status(500).send(err);
                } else {
                    if ((JSON.stringify(user._id) === JSON.stringify(req.user._id)) || req.user.admin === true) {
                        res.send(user);
                } else {
                    res.send("You don't have access to this page.")
                }
            }   
        });
    },
    
    createUserWithShoot: function(req, res) {
         User.update({
                    "_id": req.params.id
                }, {
                    $push: {
                        "shoots": req.body._id
                    }
                },
                function (err, result) {
                console.log(result);
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.send(result);
                    }
                })
    },
    
    createUser: function(req, res) {
        new User(req.body).save(function(err, newUser) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(newUser);
            }
        });
    },
    
    adminUpdateUser: function(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body).populate('shoots').exec().then(function(err, updatedUser) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(updatedUser);
            }
        });
    },
    
    adminDeleteUser: function(req, res) {
        User.findByIdAndRemove(req.params.id, function(err, deletedUser) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(deletedUser);
            }
        });
    }
    
};