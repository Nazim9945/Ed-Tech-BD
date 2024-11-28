const cloudinary=require('cloudinary').v2

exports.uploadFiles=async(file,folder,quality=100)=>{
    try {
        const options={folder};
        if(quality){
            options.quality=quality;
        }
        options.resource_type="auto"



        return await cloudinary.uploader.upload(file.tempFilePath,options)
    } catch (error) {
        console.log("failed to upload over cloudinary")
        console.log(error)
        
    }
}