import express from 'express'
import { dbConnection } from './db/dbConnection.js'
import authorRouter from './modules/authors/author.routes.js'
import bookRouter from './modules/books/book.routes.js'
const app = express()
const port = 3000
app.use(express.json())
dbConnection
app.use('/authors',authorRouter)
app.use('/books',bookRouter)



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))