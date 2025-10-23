import { Router } from "express";
import multer from "multer";

import { createRideShare, deleteRideShare, getActiveRides, getAllRides, getRideById, updateRideShare } from "../controllers/RideShare/RideSharePost.controller.js";
const upload = multer( { dest: 'uploads/' } );
const rideSharePostRouter = Router();

rideSharePostRouter.post("/createPost", upload.single("image"), createRideShare);
rideSharePostRouter.get("/getAllPost", getAllRides);
rideSharePostRouter.get("/active", getActiveRides);
rideSharePostRouter.get("/getPost/:id", getRideById);
rideSharePostRouter.put("/updatePost/:id", updateRideShare);
rideSharePostRouter.delete("/deletePost/:id", deleteRideShare);

export default rideSharePostRouter;
