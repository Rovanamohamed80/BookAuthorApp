import authorModel from "../db/models/author.model.js";

export const checkName = async(req,res,next) =>{
    let author = await authorModel.findOne({name:req.body.name})
      if(author)
        return res.status(409).json({ message: "author is already exists" });
        next()
      
}