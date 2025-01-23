import profiles from "../models/profile.js";
import postMessages from "../models/post.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()
import Image from "../models/Image.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import path from 'path';

export const addProfile = async (req,res) => {
    const formBody = req.body;
    console.log(formBody);
    formBody.password = await bcrypt.hash(formBody.password,10)
    const newProfile = new profiles(formBody)
    try {
        await newProfile.save()
        res.status(201).json(newProfile)
    } catch (error) {
        console.log(error);
        res.status(409).json({message: error.message})
    }
}

export const loginProfile = async (req,res) => {

    const formBody = req.body;
    // console.log(formBody)
    const user = await profiles.findOne({
        username: formBody.username
    })
    if (!user) return res.status(404).json({error: 'Username Not Found' })
    const isPasswordValid = await bcrypt.compare(
		formBody.password,
		user.password
	)
    if (isPasswordValid) {
        console.log("password is valid");
        
        const token = jwt.sign({
            username: user.username,
            email: user.email
        },process.env.ACCESS_TOKEN_SECRET)

        try {
            res.cookie('token', token, { httpOnly:true,maxAge:1000*60*60*24*30 });
            console.log('token',token)
            res.send('Cookie set successfully');
          } catch (error) {
            console.log(error.message)
          }

        //   console.log({status: 'correct',username: user.username ,email:user.email})
        res.status(200).json({username: user.username ,email:user.email})
    } else{
        res.status(404).json({error:'password incorrect'})
    }
}

export const getProfile = async (req,res) => {
    try {
        const username = req.user.username
        // console.log('getProfile started...: ',username);
        const userFound = await profiles.findOne({ username: username })
        // console.log(userFound);
        if (userFound) {
            console.log('user exist ')
            
            res.status(200).json({profile:userFound})
        }
        else {
            console.log("user dosn't exist ")
            res.status(404).json({error: "user dosn't exist"})
        }
        
    } catch (error) {
        res.status(404).json({error: "some error in getProfile"})
    }
}

export const updateProfile = async (req, res) => {
    try {

        const username = req.params.username;
        console.log('Updating profile for username:', username);
    
        const formBody = req.body;
        console.log('Form Body:', formBody);
  
        const updateProfile = await profiles.findOneAndUpdate(
        { username: username },
        {
          username: formBody.username,
          firstName: formBody.firstName,
          lastName: formBody.lastName,
          email: formBody.email
        }
        )
        await postMessages.updateMany(
            { instructor: username },
            {
                instructor: formBody.username
            }
        )
        if (updateProfile) {
            
            const token = jwt.sign({
                username: formBody.username,
                email: formBody.email
            },process.env.ACCESS_TOKEN_SECRET)

            res.cookie('token', token, { httpOnly:true,maxAge:1000*60*24 });
            
            // console.log('cookes : ',req.cookies['token'])
            // console.log('new cookes : ',token)

            console.log('Profile updated successfully:', updateProfile);
            res.status(200).json(updateProfile)
        }
        else {
            console.log('Profile not found')
            res.status(404).json({ error: 'Profile not found' })};
    
    } catch (error) {
      console.log('Error updating profile:', error);
      res.status(500).json({ error: 'Error updating profile:', error });
    }
  };

export const logout = async (req, res) => {
    try {
        await res.clearCookie('token');
        
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error deleting token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const uploadAvatar = async (req, res) => {
    try {
      const filePath = req.file.path;
      const fileName = req.file.filename
      console.log('File uploaded:', filePath);
      console.log('username:', req.user.username);
    
    const TheProfile = await profiles.findOne(
        { username: req.user.username }
    )
    console.log(TheProfile?.profilePicture);
    // check if there is an avatar already and delete it
    if (TheProfile.profilePicture != 'img') {
        // Delete the associated image
        const deletedImage = await Image.findOneAndDelete({ filename: TheProfile.profilePicture });
        console.log("old Avatar of", req.user, "is deleted");

        // Delete the associated image file from the "uploads" directory
        const imagePath = path.join(__dirname, '../uploads/images', TheProfile.profilePicture);
        await fs.unlink(imagePath);
        console.log("old Avatar file of", req.user, "is deleted from uploads directory");
    }

    await profiles.findOneAndUpdate(
        { username: req.user.username },
        {
            profilePicture: fileName
        }
    )
    await postMessages.updateMany(
        { instructor: req.user.username },
        {
            profilePicture: fileName
        }
    )
    // Save image details to the database
      const image = new Image({
        filename: fileName,
        path: filePath,
      });
      await image.save();
  
      res.json({ success: true, fileName });
    } catch (error) {
      console.log('Error uploading file:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  