import DBconnect  from './config/db.js';
import { app } from './app.js';

DBconnect()
.then(()=>{
    app.listen(5000,()=>{
        console.log(`server runing at : 5000`);
    })
})
.catch((error)=>{
    console.log("error in db calling : ",error);
})