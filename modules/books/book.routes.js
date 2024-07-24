import { Router } from "express";
import { addbook, deleteSpecificBook, listbook, specificBook, updateSpecificBook } from "./book.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";



const bookRouter =Router()

bookRouter.post('/',verifyToken,addbook)
bookRouter.get('/',verifyToken,listbook)
bookRouter.get('/:id',verifyToken,specificBook)
bookRouter.patch('/:id',verifyToken,updateSpecificBook)
bookRouter.delete('/:id',verifyToken,deleteSpecificBook)
export default bookRouter