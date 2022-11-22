const { Router } = require("express");

const passport = require('passport');
const { auth, register, logout } = require("../controller/authController");
const { requireAuth } = require("../middleware/isAuth");
const User = require('../models/User')
const router = Router()


passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser( function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
//test
// router.get('/mail', sendMessage)

// check user logged in
router.get('/auth', auth)

// create new admin
router.post('/register', register)

// login
router.get('/login_success', (req, res) => {
    return res.status(200).json(
        req.user
    );
});

router.get('/login_error', (req, res) => {
    return res.status(401).json({message:"Invalid email or password"}) 	
});

router.post("/login", passport.authenticate("local",{ 
    successRedirect: '/api/v1/auth/login_success',
    failureRedirect: '/api/v1/auth/login_error' 
    }
) , function (req, res) {

});

// logout

router.get('/logout',requireAuth, (req, res) => {
    
    req.logout();
    res.status(200).json({success: true});
});



module.exports = router