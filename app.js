import express, { urlencoded } from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json({ limit: "20kb" }));

app.use(urlencoded({
    extended: true,
    limit: "20kb"
}));


import userRoute from './routes/User.route.js';
app.use('/api/user', userRoute);


app.get('/', (req, res) => {
    res.send('Hello World from CargoLink Backend!');
});


// Serve uploads folder
app.use('/uploads', express.static('uploads'));
// Serve public folder
app.use(express.static("public"));

export { app };
