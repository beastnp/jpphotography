process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/////Server Basics////////
var     express = require('express')
    ,   app = express()
    ,   bodyParser = require('body-parser')
    ,   port = process.env.PORT || 8999
    ,   mongoose = require('mongoose')
    ,   cors = require('cors')
    ,   keys = require('./core/server/config/config')

/////Auth///////
    ,   session = require('express-session')
    ,   passport = require('passport')
    ,   FacebookStrategy = require('passport-facebook').Strategy
    ,   User = require('./core/server/features/users/users.server.model')

/////Amazon S3/////////
    ,   s3 = require('s3')

/////Controller Injection//////
    ,   UsersCtrl = require('./core/server/features/users/users.server.controller')
    ,   ShootsCtrl = require('./core/server/features/shoots/shoots.server.controller');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/core/public'));
console.log(__dirname);

/////Expanding Server Capacity//////
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


/////Facebook Auth with Passport///////
app.use(session({
    secret: keys.sessionSecret
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: keys.facebookCallbackUrl,
    profileFields: ['id', 'displayName', 'emails']
}, function (token, refreshToken, profile, done) {
    User.findOne({
        'facebookId': profile.id
    }, function (findErr, foundUser) {
        if (findErr) return done(findErr, false);
        if (!foundUser) {
            var newUser = {
                clientName: profile.displayName,
                facebookId: profile.id,
                email: profile.emails[0].value
            };
            User.create(newUser, function (createErr, createdUser) {
                if (createErr) return done(createErr, false);
                userId = createdUser._id;
                return done(null, createdUser);
            })
        } else {
            userId = foundUser._id;
            return done(null, foundUser);
        };
    });
}));

app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
app.get('/auth/facebook/callback', passport.authenticate('facebook'), function( req, res ) {
//    console.log(req.session);
//    console.log(req.user);
    if (req.session.passport.user) {
        if(req.session.passport.user.admin === true) {
            res.redirect('/#/admin');
        } else {
        res.redirect('/#/users/' + req.session.passport.user._id);
        }
    } else {
        res.redirect('/#/login');
    }   
});

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});


var requireAuth = function (req, res, next) {
//    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/auth/facebook')
    };
};

var requireAdminAuth = function (req, res, next) {
//    console.log(req.isAuthenticated());
    if (req.isAuthenticated() && req.session.passport.user.admin === true) {
        next();
    } else {
        return res.redirect('/auth/facebook')
    };
};

//app.get('/api/users', requireAuth, function (req, res) {
//    var currentLoggedInUserOnSession = req.user;
//    res.send(currentLoggedInUserOnSession);
//});

app.get('/api/logout', function(req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/#/login');
});


///////Users Endpoints////////
app.get('/api/users', requireAdminAuth, UsersCtrl.adminGetUsers);
app.get('/api/users/:id', requireAuth, UsersCtrl.userGetUser);
app.post('/api/users', requireAuth, UsersCtrl.createUser);
app.put('/api/users/:id', requireAuth, UsersCtrl.adminUpdateUser);
app.delete('/api/users/:id', requireAuth, UsersCtrl.adminDeleteUser);
app.post('/api/users/add-shoot/:id', requireAdminAuth, UsersCtrl.createUserWithShoot);

///////Shoots Endpoints////////
app.get('/api/shoots', requireAdminAuth, ShootsCtrl.adminGetShoots);
app.get('/api/shoots/:id', requireAuth, ShootsCtrl.userGetShoot);
app.post('/api/shoots', requireAdminAuth, ShootsCtrl.createShoot);
app.put('/api/shoots/:id', requireAdminAuth, ShootsCtrl.adminUpdateShoot);
app.delete('/api/shoots/:id', requireAdminAuth, ShootsCtrl.adminDeleteShoot);







app.listen(port, function () {
    console.log('Listening on port ' + port);
});

mongoose.connect(keys.mongoUri);
mongoose.connection.once('open', function () {
    console.log('Connected to MongoDB at ' + keys.mongoUri)
})