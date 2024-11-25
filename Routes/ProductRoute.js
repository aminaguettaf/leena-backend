import express from 'express';
import { addProduct, deleteProduct, getAllProducts, singleProduct, updateProduct } from '../controllers/ProductController.js';
import upload from '../Middlewares/multer.js';

const productRouter = express.Router();

productRouter.post('/add-product',upload.fields([{name: 'image1', maxCount:1}, {name: 'image2', maxCount:1}, {name: 'image3', maxCount:1}, {name: 'image4', maxCount:1}]), addProduct);
productRouter.post('/update-product', updateProduct);
productRouter.post('/delete-product', deleteProduct);
productRouter.get('/get-products', getAllProducts);
productRouter.get('/get-product', singleProduct);

export default productRouter;