import mongoose from'mongoose';


const DBconnect = async ()=>{
    try {
        const connectionInsta = await mongoose.connect(process.env.DB_KEY);
        console.log(`DB is connected succsfuly : Host${connectionInsta.connection.host}`)
    } catch (error) {
        console.log("error in DB connect : ", error);
    }
} 

export default DBconnect;