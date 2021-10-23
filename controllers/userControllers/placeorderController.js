const Order=require('../../models/Order');
const Book=require('../../models/Books');
const User=require('../../models/User');
const sendEmail=require('../../utils/sendEmail');
exports.placeorder=async(req,res,next)=>{
    const boughtBy=req.params.username;
    const bookid=req.query.bookid;
    try{
    const book=await Book.findById(bookid);
    const{shippingInfo,paymentInfo}=req.body;
    let order={
        book,shippingInfo,boughtBy,paymentInfo,paidAt:Date.now()
    }
    let orderPlaced=await Order.create(order);
    let user=await User.findOne({username:boughtBy});
    user.addBought(orderPlaced._id);
    await user.save();
    book.updatebookStatus("Processing");
    await book.save();
    const soldbyId=book.soldbyId;
    const soldby=await User.findById(soldbyId);
    const message1=`
       <h1>Hey ${book.soldby}! Guess what!! ${boughtBy} just placed an order for your book</h1>
       <p>Please login to the book store app to see the details and proceed with the shipping process.</p>`;
    const message2=
    `<h1>Hey ${boughtBy}! Your order for the book ${book.name} has been placed.</h1>
       <p>We'll get back to you with the order update asap.</p>`;
    await sendEmail({
               to:soldby.email,
               subject:"Someone bought your book!",
               text:message1,
           })
           await sendEmail({
               to:user.email,
               subject:"Order placed!",
               text:message2,
           })
    res.status(200).json({
        message:"order placed successfully!"
    })
    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}
