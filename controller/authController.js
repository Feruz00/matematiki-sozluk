const passport = require('passport')
const User = require("../models/User");

const auth = async (req, res) => {
    if(req.isAuthenticated()){
        return res.status(200).json(req.user);            
    }
    else{
        return res.status(401).json({
            isAuth: false
        });
    }
}

// create admin
const register =  async (req, res) => {
    
    const { firstName, lastName, password, username } = req.body;
    
    
    await User.register( {
        firstName, 
        lastName, 
        username,
        }, password, async (err,user)=>{
        if(err){
            console.log(err);
            return res.status(400).json(err);
        }
        else{
            return res.json(user)
        }
    });      
    
};

// logout
const logout = (req, res) => {
    req.logout();
    res.status(200).json({success: true});
}

// login


module.exports = {auth, register, logout}