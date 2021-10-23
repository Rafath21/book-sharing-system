const Book=require("../../models/Books");

exports.allBooks=async(req,res)=>{
      try{
        let books=await Book.find();
        res.status(200).json({
            books
        });
    }
    catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}
exports.deleteBook=async(req,res)=>{
    try{
        let book=await Book.findById(req.body.bookid);
        book.remove();
        res.status(200).json({
            message:"Book deleted"
        })
    }catch(err){
        res.status(400).json({
            message:"Something went wrong!"
        })
    }
}