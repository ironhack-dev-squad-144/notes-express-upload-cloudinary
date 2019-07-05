// models/Movie.js

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  description: String,
  imgName: String, // In practise, we don't care about this file
  imgPath: String,
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

var Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;