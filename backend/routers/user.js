const express = require('express');
const { AddUser, GetAllUser, GetSingleUser, LoginUser, usercount } = require('../controller/user');
const userrouter = express.Router();

userrouter.get('/get-count/',usercount)
userrouter.post('/register',AddUser)
userrouter.get('/',GetAllUser)
userrouter.get('/:id',GetSingleUser)
userrouter.post('/login',LoginUser)

module.exports = userrouter;