// routes/index.js

const express = require("express");
const Movie = require("../models/Movie.js");
const uploadCloud = require("../config/cloudinary")
const router = express.Router();

router.get("/", (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render("index", { movies });
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/movie/add", (req, res, next) => {
  res.render("movie-add");
});

router.post("/movie/add", uploadCloud.single("photo"), (req, res, next) => {
  console.log("TCL: req.file", req.file);
  const { title, description } = req.body;
  const imgPath = req.file.secure_url; // The HTTPS url where the file is saved on cloudinary
  const imgName = req.file.originalname;
  const newMovie = new Movie({ title, description, imgPath, imgName });
  newMovie
    .save()
    .then(movie => {
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
