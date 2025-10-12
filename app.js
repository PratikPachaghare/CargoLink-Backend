import express, { urlencoded } from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin :"http://localhost:3000",
    credentials:true
}))
app.use(express.json({limit:"20kb"}));

app.use(urlencoded({
    extended: true,
    limit:"20kb"
}))

app.use(express.static("public"));

export {app}