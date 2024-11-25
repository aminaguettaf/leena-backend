import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/CartController.js';
import userAuth from '../Middlewares/userAuth.js';

const cartRouter = express.Router();

cartRouter.post('/addToCart', userAuth, addToCart);
cartRouter.post('/removeFromCart', userAuth, removeFromCart);
cartRouter.post('/getCart', userAuth, getCart);

export default cartRouter;