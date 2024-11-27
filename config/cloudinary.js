const cloudinary=require('cloudinary')
require('dotenv').config()
exports.cloudinary=async()=>{
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME, 
        api_key: API_KEY, 
        api_secret: API_SECRET
    })
}