const { default: mongoose } = require("mongoose");
const Order = require('../models/order');
const Orderitem = require("../models/Orderitem");


module.exports.PlaceOrder = async (req, res) => {
    try {
        console.log(req.body)
        const orderitemids = Promise.all(req.body.map(async item => {
            let orderitemid = new Orderitem({
                quantity:item.quantity,
                Product:item.Product,
            })
            orderitemid = await orderitemid.save(); 
            return orderitemid._id.toString();
        }))

        // const waitfororder = await orderitemids;
        // console.log("orderitem",waitfororder)
        
        // const totalPriceOrder = await Promise.all(waitfororder.map(async(item) => {
        //     const orderitemcal = await Orderitem.findById(item).populate('Product','price')
        //     let order = orderitemcal.quantity * orderitemcal.Product.price;
        //     return order;
        // }))
        // console.log(totalPriceOrder)
        // const totalprice = totalPriceOrder.reduce((a,b) => {
        //     return a+b
        // },0)
        // const orderitem = await Order.create({
        //     orderitems:waitfororder,
        //     shippingAddress1:req.body.shippingAddress1,
        //     shippingAddress2:req.body.shippingAddress2,
        //     zip: req.body.zip,
        //     city: req.body.city,
        //     country: req.body.country,
        //     phone: req.body.phone,
        //     status:req.body.status,
        //     totalPrice:totalprice,
        //     User:req.body.User
        // })

        if (!orderitem) {
            return res.status(404).send("Your order have some problems")
        }

        return res.status(200).json({ msg: "Your order have been placed" , data:orderitem})

    } catch (error) {
        console.log("error",error)
        res.status(500).json({ msg: error.message })
    }
}



module.exports.GetOrderDetails = async (req, res) => {
    try {
        const orderList = await Order.find().populate('User','email').sort({'dateOrder':-1});
        if (!orderList) {
            return res.status(404).send("No Order Yet been made")
        }
        return res.status(200).send(orderList)

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports.GetIndividualOrder = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(404).json({msg:"Invalid Object Id"})
        }
        const singlecategory = await Order.findById(req.params.id)
        .populate('User','email').populate({path:'orderitems',populate:{path:'Product',populate:'category'}});
        if (!singlecategory) {
            return res.status(404).json({ msg: "No order with id has been found" })
        }

        return res.status(200).json({ data: singlecategory })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports.DeleteOrder = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(404).json({msg:"Invalid Object Id"})
        }
         
        const find = await Order.findByIdAndDelete(req.params.id)
        
        if (find) {
            const deleteitemsids = Promise.all(find.orderitems.map(async (item) => {
                console.log(item.toString())
                let deleteditems = await Orderitem.findByIdAndDelete(item.toString())
            }))
            let waitforpromise = await deleteitemsids;
            console.log("delete",waitforpromise)
            return res.status(200).send("The Order has been deleted")
        }
        return res.status(400).json({msg:"The Order has not been Deleted"})

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports.UpdateOrderStatus = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(404).json({msg:"Invalid Object Id"})
        }
        const update = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status,
            },
            {new:true}
        )
        if (!update) {
            return res.status(200).send("The Order status has not been updated")
        }
        return res.status(400).json({msg:"The Order has been Updated",data:update})

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}



module.exports.GetTotalSales = async (req, res) => {
    try {
        const orderList = await Order.aggregate([
            {$group:{_id:null,totalsales:{$sum:'$totalPrice'}}}
        ])
        if (!orderList) {
            return res.status(404).send({msg:"No sales has been made"})
        }
        return res.status(200).send({totalsales:orderList.pop().totalsales})

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}



module.exports.OrderCount = async (req, res) => {
    try {
        const ordercount = await Order.countDocuments();
        if (!ordercount) {
            return res.status(404).send("No Order have been made")
        }
        return res.status(200).json({ordercount:ordercount})

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports.GetUserSpecified = async (req, res) => {
    try {
        const orderList = await Order.find({User:req.params.userid})
        .populate('User','email').populate({path:'orderitems',populate:{path:'Product',populate:'category'}});
        if (!orderList) {
            return res.status(404).send("No Order Yet been made")
        }
        return res.status(200).send(orderList)

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}