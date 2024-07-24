import authorModel from "../../db/models/author.model.js"
import jwt from 'jsonwebtoken'
import bookModel from "../../db/models/book.model.js"

const signUp = async(req,res)=>{
    let authorr = await authorModel.insertMany(req.body)
    return res.status(201).json({message: "User created successfully",authorr})

}
const loginAuthor = async(req,res)=>{
    let author = await authorModel.findOne({name:req.body.name})
    if(!author){
      return res.status(409).json({ message: "author is not found" });
    }else{
        let token = jwt.sign({id:author.id,name:author.name},"authorBookApp")
        return res.status(201).json({message: "author login successfully",token:token})
    }
    }

const allAuthor = async(req,res)=>{
    let book = await bookModel.find({author:req.user.id})
    if (book){
    let author = await authorModel.updateOne({_id:req.user.id},{books:book})  
    if(author){
    let authorr = await authorModel.find().populate('books')   
    return res.status(200).json({message: "success",authorr})}
    }}
const specificAuthor = async (req, res) => {
    let author = await authorModel.findOne({_id:req.params.id,name:req.user.name}).populate('books')
    if(author)
    return res.status(200).json({ message: "success", author })
    return res.status(404).json({ message: "this author is not found"})
}
const updateSpecificAuthor = async (req, res) => {
    let author = await authorModel.findOneAndUpdate({_id:req.params.id,name:req.user.name},{bio:req.body.bio})
    if(!author){
     return res.status(404).json({ message: "this author is not found"})
    }
    return res.status(200).json({ message: "this author is updated successfully"})
}
const deleteSpecificAuthor = async (req, res) => {
    let author = await authorModel.findOneAndDelete({_id:req.params.id,name:req.user.name})
    if(!author){
     return res.status(404).json({ message: "this author is not found"})
    }
    await bookModel.deleteMany({ author: author._id });
    return res.status(200).json({ message: "ths author is deleted successfully"})
}


export{
    signUp,loginAuthor,allAuthor,specificAuthor,updateSpecificAuthor,deleteSpecificAuthor
}