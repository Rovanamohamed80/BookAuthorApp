import authorModel from "../../db/models/author.model.js";
import bookModel from "../../db/models/book.model.js";

const addbook = async (req, res) => {
    const { title, content } = req.body;
    const authorr = await authorModel.findOne({ _id: req.user.id });
    if (!authorr) {
        return res.status(409).json({ message: "Author not found" });
    }
    req.body.author = req.user.id;
    let author = req.body.author
    const book = await bookModel.create({ title, content, author});
    let Books = await bookModel.find({author:req.user.id})
    if(Books)
    await authorModel.updateOne({ _id: req.user.id },{books: Books});
    return res.status(201).json({ message: "Book added successfully", book });
};
const listbook = async(req,res)=>{
        let author = await authorModel.findOne({_id:req.user.id})
        if(author){
        let books = await bookModel.find({author:req.user.id})
        return res.status(200).json({ message: "success", books })}

    }

const specificBook = async (req, res) => {
    let book = await bookModel.findOne({ _id: req.params.id,author:req.user.id})
    if (book)
    return res.status(200).json({ message: "success", book })
    return res.status(404).json({ message: "this author can not retrieve this book", book })
}
const updateSpecificBook = async (req, res) => {
    let Book = await bookModel.findOneAndUpdate({_id:req.params.id,author:req.user.id},{title:req.body.title,content:req.body.content})
    if(!Book){
     return res.status(404).json({ message: "this Book is not found"})
    }
    return res.status(200).json({ message: "this Book is updated successfully"})
}
const deleteSpecificBook = async (req, res) => {
    let book = await bookModel.findOneAndDelete({_id:req.params.id,author:req.user.id})
    if(!book){
     return res.status(404).json({ message: "this book is not found"})
    }
    await authorModel.updateOne({ _id: req.user.id },{books: book});
    return res.status(200).json({ message: "ths book is deleted successfully"})
}

export{
    addbook,listbook,specificBook,updateSpecificBook,deleteSpecificBook
}