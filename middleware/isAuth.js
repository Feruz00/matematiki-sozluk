
const requireAuth = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.status(403).json({message:"You cannot access this page"});           
    }
    next();
}
module.exports = {requireAuth}