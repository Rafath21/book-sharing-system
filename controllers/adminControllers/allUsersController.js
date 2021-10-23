const Book=require("../../models/Books")
const User=require('../../models/User');
exports.allUsers=async(req,res)=>{
    try{
        let users=await User.find();
        res.status(200).send(users);
    }
    catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}
//update a user
exports.updateUser=async(req,res)=>{
    try{
    let user=await User.findById(req.body.userid);
    user.updateRole(req.body.role);
    await user.save();
    res.status(200).json({
        message:"User updated successfully"
    })
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}
//delete a user
exports.deleteUser=async(req,res)=>{
    try{
        let user=await User.findById(req.body.userid);
        user.remove();
        let { books }=await Book.find({soldbyId:req.body.userid})
        books.forEach(element => {
            element.remove();
        });
        res.status(200).json({
            message:"User deleted"
        })
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}
