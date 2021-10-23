const jwt=require('jsonwebtoken');
const ErrorResponse=require("../utils/errorResponse");
const User=require('../models/User');

exports.isAuthenticated=async(req,res,next)=>{
const {token}=req.cookies;
if(!token){
    return next(new ErrorResponse("Please login to view the resourse",401));
}
const decodedData=jwt.verify(token,process.env.JWT_SECRET);
req.user=await User.findById(decodedData.id);
next();
}
module.exports.isAuthorized = function (roles) {
    return async function (req, res,next) {
        let {user}=req.user;
        let userRole = req.user.role;
        // id -> user get ,user role,
        try {
            let userisAuthorized = roles.includes(userRole);
            if (userisAuthorized) {
                req.user = user;
                next();
            } else {
                res.status(200).json({
                    message: "user not authorized"
                })
            }
        } catch (err) {
            res.status(500).json({
                message: "Server error"
            });
        }
    }

}
