const express = require('express');
const { PostProduct, GetProduct, GetIndividualProduct, UpdateProduct, DeleteProduct, ProductCount, FeaturedProduct, FilterProductByCategory, UpdateGalleryimages } = require('../controller/product');
const productrouter = express.Router();
const multer = require('multer');
const path = require('path')

const FileType = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const check = FileType[file.mimetype];
    let uploaderror = new Error("invalid image Type")
    if(check){
      uploaderror =  null;
    }
    cb(uploaderror, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = file.originalname.replace(' ', '-');
    const extension = FileType[file.mimetype]
    console.log("extension is", extension)
    cb(null, uniqueSuffix + '-' + Date.now() + '.' + extension)
  }
})

const upload = multer({
  storage: storage,
})
productrouter.put('/:id', UpdateProduct)
productrouter.get('/get-count/', ProductCount)
productrouter.post('/', PostProduct)
productrouter.get('/', GetProduct)
productrouter.get('/:id', GetIndividualProduct)
productrouter.put('/gallery-images/:id',UpdateGalleryimages)
productrouter.delete('/:id', DeleteProduct)
productrouter.get('/featured/:count', FeaturedProduct)
productrouter.get('/filter', FilterProductByCategory)
module.exports = productrouter;