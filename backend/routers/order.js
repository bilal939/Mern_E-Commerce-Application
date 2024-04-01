const express = require('express');
const { PlaceOrder, GetOrderDetails, GetIndividualOrder, UpdateOrderStatus, DeleteOrder, GetTotalSales, OrderCount, GetUserSpecified } = require('../controller/order');
const OrderRouter = express.Router();

  

OrderRouter.get('/count/',OrderCount)
OrderRouter.get('/gettotalsales/',GetTotalSales)
OrderRouter.post('/place-order/',PlaceOrder)
OrderRouter.get('/',GetOrderDetails)
OrderRouter.get('/:id',GetIndividualOrder)
OrderRouter.put('/:id',UpdateOrderStatus)
OrderRouter.delete('/:id',DeleteOrder)
OrderRouter.get('/userorder/:userid',GetUserSpecified)
module.exports = OrderRouter;