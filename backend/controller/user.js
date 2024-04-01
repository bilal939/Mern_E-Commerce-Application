const User = require("../models/user");
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
module.exports.AddUser = async (req, res) => {
    try {
        const { email } = req.body;
        const finduser = await User.findOne({ email: email })
        if (finduser) {
            console.log(finduser)
            return res.json({ success:false ,msg: "user already exists" })
        };

        const newuser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            Apartment: req.body.Apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country
        })

        if (!newuser) {
            return res.json({status:false , msg:"user not created"})
        }

        return res.json({ status:true, msg: "The user has been created", data: newuser })

    } catch (error) {
        console.log(error)
        return res.json({status:false, msg: error.message })
    }
}

module.exports.GetSingleUser = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            res.status(404).json({ msg: "Invalid Object Id" })
        }
        const singleuser = await User.findById(req.params.id).select('-password');
        if (!singleuser) {
            return res.status(404).json({ msg: "No user with id has been found" })
        }

        return res.status(200).json({ data: singleuser })
    } catch (error) {
        return res.json({msg:error,status:400})
    }
}



module.exports.GetAllUser = async (req, res) => {
    try {
        const Allusers = await User.find().select('name email');;
        if (!Allusers) {
            return res.status(404).send("No categories")
        }

        return res.status(200).send(Allusers)

    } catch (error) {
        return res.json({msg:error,status:400})
    }
}


module.exports.LoginUser = async (req, res) => {
    try {
        console.log(req.body)
        const checkuser = await User.findOne({ email: req.body.email })
        console.log("check user is",checkuser)
        if (!checkuser) return res.json({status:false,msg: "User does not exists" })
        if (checkuser && await checkuser.comparePassword(req.body.password)) {
            const token = jwt.sign({
                userid: checkuser._id,
                isAdmin:checkuser.isAdmin
            }, process.env.JWT_KEY, {
                expiresIn: '1h'
            })

            return res.json({ data:checkuser , status:200 , token:token , msg:"Successfull loggedin" })
        }
        else{
            return res.json({msg:"Password not correct",status:400})
        }
    } catch (error) {
        return res.json({msg:error,status:400})
    }
}

module.exports.usercount = async (req, res) => {
    try {
        const usercount = await User.countDocuments();
        if (!usercount) {
            return res.status(404).send("No Users")
        }
        return res.status(200).json({usercount:usercount})

    } catch (error) {
        return res.json({msg:error,status:400})
    }
}


