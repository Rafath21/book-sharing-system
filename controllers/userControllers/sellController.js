const Book=require("../../models/Books");
const User=require("../../models/User");
const sendEmail=require('../../utils/sendEmail');
const cloudinary=require('cloudinary');

exports.sellBooks=async(req,res)=>{
    const myCloud=await cloudinary.v2.uploader.upload(req.body.img,{
        folder:"bookCovers",
        width:150,
    });

    const id=req.params.id;
    if(id==""){
        res.status(300).json({
            message:"Please login to post!"
        })
    }
    const {bookname,img,price,shipsTo,cardno}=req.body;
    try{
    let user=await User.findById(id);
    let username=user.username;
    const obj={
        name:bookname,
        soldby:username,
        soldbyId:id,
        img:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        },
        price:price,
        shipsTo:shipsTo,
        cardno:cardno
    }
    let bookCreated=await Book.create(obj);
    user.addSold(bookCreated._id);
    await user.save();
    const message=`
       <h1>Hey ${username}! Your book has just been added to the portal.</h1>
       <p>We will get back to you as soon as someone orders your book.</p>`;
        await sendEmail({
               to:user.email,
               subject:"Book Added!",
               text:message,
           })
    res.status(200).json({
        message:"Book added successfully!"
    })
    }
    catch(err){
          res.status(400).json({
            message:err.message
        })
    }
    
}