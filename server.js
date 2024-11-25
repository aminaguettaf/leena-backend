import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnection } from './config/db.js';
import productRouter from './Routes/ProductRoute.js';
import  cartRouter  from './Routes/CartRoute.js';
import userRouter from './Routes/UserRoute.js';
import orderRouter from './Routes/OrderRoute.js';
import adminRouter from './Routes/AdminRoute.js';

const app = express();
const port = process.env.PORT || 4000;
dotenv.config();

dbConnection()

app.use(cors());
app.use(express.json());

app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);
app.use('/api/admin', adminRouter);
app.use('/images', express.static('uploads'));

app.get('/', (req, res)=>{
    res.send('API working');
})

app.listen(port, ()=>{
    console.log('Server started');
})