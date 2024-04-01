const { default: mongoose } = require("mongoose");
const categorie = require("../models/categorie");


module.exports.POSTCATEGORY = async (req, res) => {
    try {
        const { name } = req.body;
        const Categoryitem = await categorie.create({
            name: name,
        })

        console.log(Categoryitem)

        if (!Categoryitem) {
            return res.status(404).send("The category cannt be created")
        }

        return res.status(200).json({ msg: "The category has been created" })

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports.GetIndividualCategory = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(404).json({msg:"Invalid Object Id"})
        }
        const singlecategory = await categorie.findById(req.params.id);
        if (!categorie) {
            return res.status(404).json({ msg: "No category with id has been found" })
        }

        return res.status(200).json({ data: singlecategory })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}



module.exports.GetCategory = async (req, res) => {
    try {
        const categorylist = await categorie.find();
        if (!categorie) {
            return res.status(404).send("No categories")
        }

        return res.status(200).send(categorylist)

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports.DeleteCategory = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(404).json({msg:"Invalid Object Id"})
        }

        const find = await categorie.findByIdAndDelete(req.params.id)
        console.log(find)
        if (find) {
            return res.status(200).send("The category has been deleted")
        }
        return res.status(400).send("The category has not been Deleted")

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports.UpdateCategory = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(404).json({msg:"Invalid Object Id"})
        }
        const update = await categorie.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                Iconname: req.body.Iconname,
                Color: req.body.Color
            },
            {new:true}
        )
        if (!update) {
            return res.status(200).send("The category has not been updated")
        }
        return res.status(400).json({msg:"The category has been Updated",data:update})

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}