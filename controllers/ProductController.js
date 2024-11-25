import productModel from "../models/ProductModel.js";

const addProduct = async(req, res)=>{
    try {
        const {name, price, category, sizes, colors, description} = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item)=> item !== undefined);

        let imageUrl = images.map((item)=>{
            return `${item.filename}`;
        })

        const newProduct = new productModel({
        name,
        price: Number(price),
        category,
        sizes: JSON.parse(sizes),
        colors: JSON.parse(colors),
        image: imageUrl,
        description,
        date: Date.now()
    })
    await newProduct.save();
    res.json({success:true, message:'Product Added'});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

const updateProduct = async(req, res)=>{
    try {
        const {productId, name, price, category, sizes, colors, description} = req.body;
        const product = await productModel.findById(productId);
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item)=> item !== undefined);

        let imageUrl =  images.map((item)=> item.filename);
        
        const data ={
            name,
            price: Number(price),
            category,
            sizes: JSON.parse(sizes),
            colors: JSON.parse(colors),
            image: imageUrl,
            description,
            date: Date.now()
        }

        const updateProd = await productModel.findByIdAndUpdate(productId, {data}, {new:true});
        if(updateProd){
            return res.json({success:true, message:'Product updated'});
        }
        else{
            return res.json({success:false, message:'Error'});
        }
    } catch (error) {
        res.json({ success: false, message: error.message, stack: error.stack });
    }
}

const deleteProduct = async(req, res)=>{
    try {
        const {productId} = req.body;
        const deleteProd = await productModel.findByIdAndDelete(productId);
        if(deleteProd){
            return res.json({success:true, message:'Product deleted'});
        }
        else{
            return res.json({success:false, message:'Error'});
        }
    } catch (error) {
        res.json({success:false, message:error.message});
    } 
}

const getAllProducts = async(req,res)=>{
    try {
        const products = await productModel.find();
        if(products){
            res.json({success:true, data: products});
        }
        else{
            return res.json({success:false, message:'Error'});
        }
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}
const singleProduct = async(req, res)=>{
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success:true, product});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

export {addProduct, updateProduct, deleteProduct, getAllProducts, singleProduct};