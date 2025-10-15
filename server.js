import DBconnect  from './config/db.js';
import { app } from './app.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

DBconnect()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server runing at : http://localhost:${PORT}`);
    })
})
.catch((error)=>{
    console.log("error in db calling : ",error);
})