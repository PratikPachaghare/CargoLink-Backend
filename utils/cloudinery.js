
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
 
cloudinary.config({   
    cloud_name: 'dncz7an76', 
    api_key:595497451849567, 
    api_secret: 'Z5I4fa2GoL28FQgJo_gD88ZJkXw'
    })

const uplodsOnCloudinary = async (localFile) =>{
    try {
        const respoans = await cloudinary.uploader.upload(localFile,{resource_type:"auto"})
        console.log("file upload succefull on cloudinery",respoans.url);
        return respoans;
    } catch (error) {
        fs.unlinkSync(localFile);
        console.log("error in file uplod in uplod on cloudinary",error);
        return null;
    }
}


export {uplodsOnCloudinary}
