const mongoose = require('mongoose');

const connectdatabase = async () => {
    mongoose.connect(process.env.MONGO_URL).then(()=>{
      console.log("Dtabase has been connected")
    }).catch((error)=>{
        console.log(error)
        console.log("there is a error in connecting the databse")
    })
}

module.exports = connectdatabase;