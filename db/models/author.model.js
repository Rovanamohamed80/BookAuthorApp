import {model, Schema, Types }from "mongoose";

const authorSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    bio: String,
    birthDate:Date,
    books: [{
      type: Types.ObjectId,
      ref: 'Book'
    }]
  });
const authorModel =model('Author',authorSchema)


export default authorModel