import express from 'express';
import { allOrders, placeOrder, updateStatus, userOrders } from '../controllers/OrderController.js';
import userAuth from '../Middlewares/userAuth.js';
import adminAuth from '../Middlewares/adminAuth.js';

const orderRouter = express.Router();

orderRouter.post('/place-order',userAuth, placeOrder);
orderRouter.post('/update-status', updateStatus);
orderRouter.post('/all-orders',adminAuth, allOrders);
orderRouter.post('/user-orders',userAuth, userOrders);

export default orderRouter;