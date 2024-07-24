import { Router } from "express";
import { allAuthor, deleteSpecificAuthor, loginAuthor, signUp, specificAuthor, updateSpecificAuthor } from "./author.controller.js";
import { checkName } from "../../middleware/checkEmail.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const authorRouter =Router()

authorRouter.post('/',checkName,signUp)
authorRouter.post('/signin',loginAuthor)
authorRouter.get('/',verifyToken,allAuthor)
authorRouter.get('/:id',verifyToken,specificAuthor)
authorRouter.patch('/:id',verifyToken,updateSpecificAuthor)
authorRouter.delete('/:id',verifyToken,deleteSpecificAuthor)
export default authorRouter