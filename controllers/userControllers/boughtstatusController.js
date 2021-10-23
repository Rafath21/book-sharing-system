const Order=require('../../models/Order');
const mongoose=require('mongoose');
//info of the book that is currently being bought
exports.boughtStatus=async(req,res,next)=>{
 let bookid=req.params.id;
 try{
 const bookstatus = await Order.findOne({ book:  mongoose.Types.ObjectId(bookid) });
 res.status(200).send(bookstatus);
 }
 catch(err){
     res.status(400).json({
         error:err.message
     })
 }
}