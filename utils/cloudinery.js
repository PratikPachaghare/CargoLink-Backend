
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
 
cloudinary.config({   
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINERY_SECREAT_KEY
    })

const uplodsOnCloudinary = async (localFile) =>{
    try {
        const respoans = await cloudinary.uploader.upload(localFile,{resource_type:"auto"})
        console.log("file upload succefull on cloudinery",respoans.url);
        return respoans;
    } catch (error) {
        fs.unlinkSync(localFile);
        console.log("error in file uplod in uplod on cloudinary");
        return null;
    }
}


export {uplodsOnCloudinary}
