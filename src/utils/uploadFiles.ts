// const cloudinary=require('cloudinary').v2
import {v2 as cloudinary} from 'cloudinary'
const uploadFiles=async(file:any,folder:string,quality=100)=>{
    try {
        const options: {
          folder: string,
          quality?:number
          resource_type?: "image" | "video" | "raw" | "auto";
        } = { folder };
        if(quality){
           
                options.quality=quality
            
        }
        options.resource_type="auto"



        return await cloudinary.uploader.upload(file.tempFilePath,options)
    } catch (error) {
        console.log("failed to upload over cloudinary")
        console.log(error)
        
    }
}

export default uploadFiles