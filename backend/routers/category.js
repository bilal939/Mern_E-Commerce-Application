const express = require('express');
const categoryrouter = express.Router();
const {
   POSTCATEGORY,
   DeleteCategory,
   GetCategory,
   GetIndividualCategory,
   UpdateCategory
} = require("../controller/category");
  

categoryrouter.post('/',POSTCATEGORY)
categoryrouter.delete('/:id',DeleteCategory)
categoryrouter.get('/',GetCategory)
categoryrouter.get('/:id',GetIndividualCategory);
categoryrouter.put('/:id',UpdateCategory)

module.exports = categoryrouter;