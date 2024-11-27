const cloudinary=require('cloudinary')

exports.cloudinary=async()=>{
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME, 
        api_key: API_KEY, 
        api_secret: API_SECRET
    })
}