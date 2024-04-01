const product = require('../models/product')
const categorie = require('../models/categorie');
const { default: mongoose } = require('mongoose');



module.exports.PostProduct = async (req, res) => {
    try {
        const check = await categorie.findById(req.body.category);
        console.log("chce",check)
        if (!check) return res.status(400).json({ msg: "invalid category Id" });
        // const filecheck  = req.file;
        // if (!filecheck) return res.status(400).json({ msg: "no image has been found" });
        const isProductAdded = await product.create({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            Images: req.body.Images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countinStock: req.body.countinStock,
            ratings: req.body.ratings,
            Numreviews: req.body.Numreviews,
            isfeatured: req.body.isfeatured
        })
        console.log("prodict is added",isProductAdded)

        if (!isProductAdded) {
            return res.status(404).send("The product cannot be created")
        }

        return res.status(200).json({ msg: "The Product has been created",data:isProductAdded,status:true })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error.message })
    }
}



module.exports.GetProduct = async (req, res) => {
    try {
        const productlist = await product.find().populate('category');
        if (!productlist) {
            return res.status(404).send("No product")
        }

        return res.status(200).send(productlist)

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports.GetIndividualProduct = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(404).json({msg:"Invalid Object Id"})
        }product
        const singleproduct = await product.findById(req.params.id);
        if (!singleproduct) {
            return res.status(404).json({ msg: "No category with id has been found" })
        }

        return res.status(200).json({ data: singleproduct })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}



module.exports.UpdateProduct = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(404).json({msg:"Product id is not valid"})
        }

        console.log("heelo")
        const check = await categorie.findById(req.body.category);
        if (!check) return res.status(400).json({ msg: "invalid category Id" });

        const checkprdouct = await product.findById(req.params.id);
        console.log("check",checkprdouct)
        if (!checkprdouct) return res.status(400).json({ msg: "invalid product Id" });
  

       

        const update = await product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image: req.body.image,
                Images: req.body.Images,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countinStock: req.body.countinStock,
                ratings: req.body.ratings,
                Numreviews: req.body.Numreviews,
                isfeatured: req.body.isfeatured
            },
            {new:true}
        )

        console.log("mmm",update)
        if (!update) {
            return res.status(200).send("The product has not  been updated")
        }
        return res.json({msg:"The product has been Updated",data:update,status:200})

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports.DeleteProduct = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(404).json({msg:"Product id is not valid"})
        }
        const find = await product.findByIdAndDelete(req.params.id)
        console.log(find)
        if (find) {
            return res.json({status:true,msg:"The Product has been deleted"})
        }
        return res.json({status:false,msg:"The Product has not been deleted"})

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}



module.exports.ProductCount = async (req, res) => {
    try {
        const productcount = await product.countDocuments();
        if (!productcount) {
            return res.status(404).send("No product")
        }
        return res.status(200).json({productcount:productcount})

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}



module.exports.FeaturedProduct = async (req, res) => {
    try {
       
        const count = req.params.count ? req.params.count : 0;
        console.log(count)
        const products = await product.find({isfeatured:true}).limit(count);
        if (!products) {
            return res.status(404).send("No product")
        }
        return res.status(200).json({data:products})

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports.FilterProductByCategory = async (req,res) => {
    try {
        console.log("aaa",req.query.categories)
        let filter = {};
        if(req.query.categories){
            filter = {categories:req.query.categories.spil(",")}
        }
        console.log("filter")
        const productlist = await product.find(filter);
        if (!productlist) {
            return res.status(404).send("No product")
        }

        return res.status(200).send(productlist)
        
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports.UpdateGalleryimages = async (req, res) => {
    try {
        console.log("hello")
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(404).json({msg:"Product id is not valid"})
        }

        const checkprdouct = await product.findById(req.params.id);
        if (!checkprdouct) return res.status(400).json({ msg: "invalid product Id" });
  
        let imagesPath = [];
        const files = req.files;
        if(files){
            files.map((file) => {
                imagesPath.push(`${req.protocol}://${req.get('host')}/public/uploads/${file.filename}`)
            })
        }
        console.log(imagesPath)
        

        const update = await product.findByIdAndUpdate(
            req.params.id,
            {
                Images: imagesPath,
                
            },
            {new:true}
        )
        if (!update) {
            return res.status(200).send("The images gallery has not been updated")
        }
        return res.status(400).json({msg:"The image gallery has been  Updated",data:update})

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
