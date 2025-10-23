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
import deliveryRoute from './routes/Delivery.route.js';
import rideSharePostRouter from './routes/RideSharePost.route.js';
import vehicleRouter from './routes/Vehicle.route.js';
import notificationRouter from './routes/Notification.route.js';


app.use('/api/user', userRoute);
app.use('/api/delivery', deliveryRoute);
app.use('/api/rideSharePost', rideSharePostRouter);
app.use('/api/vehicle', vehicleRouter);
app.use('/api/notifications', notificationRouter);




app.get('/', (req, res) => {
    res.send('Hello World from CargoLink Backend!');
});
// Serve uploads folder
app.use('/uploads', express.static('uploads'));
// Serve public folder
app.use(express.static("public"));


export { app };
