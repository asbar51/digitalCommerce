import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import profiles from '../models/profile.js';
dotenv.config()

export const tokenChecker = async (req,res,next) => {
    let token = req.cookies['token'] 
    
    // console.log('token : ',token)
    if (token) {
        try {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            console.log('good token ')
            req.user = user;
            console.log('username : ',user.username);
            
            next()
        }catch (err){
            res.clearCookie('token')
            console.log('wrong token ')
            res.status(404).json('logout')
        }
    } else {
        console.log('no cookie');
        res.json('logout')
        // res.status(404).json({error:'logout'})
    }
}