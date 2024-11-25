import jwt from 'jsonwebtoken';
const adminLogin = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
         const atoken = jwt.sign({email,password}, process.env.JWT_SECRET);
         res.json({success: true, atoken});
        }
        else{
            res.json({success: false, message:'Your email or password is incorrect'});
        }
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

export {adminLogin};