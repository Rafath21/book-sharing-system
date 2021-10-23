const Book=require("../../models/Books");
exports.getBooks=async(req,res)=>{
   try{
    let books= await Book.find({bookStatus:"unsold"});
   res.status(200).json({
       books:books,
   })
   }catch(err){
       res.status(400).json({
           message:err.message
       })
   }
   
}