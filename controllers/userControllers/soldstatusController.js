const Order=require('../../models/Order');
const Book=require('../../models/Books');
const User=require('../../models/User');
const mongoose=require('mongoose');
const sendEmail=require('../../utils/sendEmail');

//get the information of the single book that is being sold
exports.soldstatusGet=async(req,res,next)=>{
 let bookid=req.params.id;
 try{
 const booksold = await Order.findOne({ book:  mongoose.Types.ObjectId(bookid) });
 res.status(200).send(booksold);
 }
 catch(err){
     res.status(400).json({
         error:err.message
     })
 }
}
//update the information of the single book that is being sold
exports.soldstatusPost=async(req,res,next)=>{
 let bookid=req.params.id;
 try{
const book=await Book.findById(bookid);
  const booksold = await Order.findOne({ book:  mongoose.Types.ObjectId(bookid) });
  const buyer=await User.findOne({username:booksold.boughtBy})
  if(req.body.OrderStatus=="Denied"){
    await booksold.remove();
    book.updatebookStatus("unsold");
    await book.save();
    //send an email to buyer that their request has been denied.
    const message=`
       <h1>Hey ${buyer.username}!</h1>
       <p>We're sorry to inform you that the seller of the book ${book.name} has denied your order request for shipping reasons. Please browse through our website to see more options. Thank you!</p>`;
        await sendEmail({
               to:buyer.email,
               subject:"We're sorry!",
               text:message,
           })
    }else{
    book.updatebookStatus("sold");
    await book.save();
  booksold.updateOrderstatus(req.body.OrderStatus);
  await booksold.save();
  const message=`
       <h1>Hey ${buyer.username}!</h1>
       <p>Congratulations! The status of your order for the book ${book.name} just got updated by the seller. Order Status:${req.body.OrderStatus}</p>`;
        await sendEmail({
               to:buyer.email,
               subject:"Order status update",
               text:message,
           })
  }
  res.status(200).json({
      message:"Order status updated successfully"
  })
 }
 catch(err){
     res.status(400).json({
         error:err.message
     })
 }
}