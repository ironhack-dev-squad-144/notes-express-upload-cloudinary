// config/cloudinary.js (config folder is new)

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

// Config cloudinary to be linked to our account
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

console.log("CONFIG", {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

// Information on how to store files into Cloudinary
var storage = cloudinaryStorage({
  cloudinary: cloudinary, // Linked to our cloudinary account
  folder: 'cenoura', // The name of the folder in cloudinary where the files will be saved
  allowedFormats: ['jpg', 'png'], // Only to save jpg and png files
  filename: function (req, file, cb) { // This function is executed when we save a file and the goal the determine the name of the saved file
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
    // cb(null, "maçã"); // The file would be saved has "maçã"
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;

// // The uploadCloud variable can be used in route
// router.post("/my-route", uploadCloud.single("photo"), (req,res,next) => {
//   req.file.secure_url // => contains the HTTPS url of the picture
// })

// You need to make sure to have a form with  enctype="multipart/form-data" and <input type="file" name="photo">