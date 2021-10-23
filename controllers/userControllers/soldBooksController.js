const User=require("../../models/User");
exports.soldBooks=async(req,res)=>{
    const id=req.params.id;
    if(id==""){
        res.status(300).json({
            message:"Please login to see your data!"
        })
    }
    try{
    let soldBooks=await User.findById(id).populate('sold')
    soldBooks=soldBooks.sold;
    res.status(200).json({
        soldBooks
    })
    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}
