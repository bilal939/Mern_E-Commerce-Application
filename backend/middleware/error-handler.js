function errorhandler(err,req,res,next) {
    console.log(err?.name);
    if(err?.name == 'UnauthorizedError'){
      return  res.status(400).json({msg:err.inner.message})
    }

    if(err?.name == 'validationError'){
        return res.status(400).json({msg:err})
    }

    return res.status(500).json({msg:"Network Error"})
}

module.exports = errorhandler;