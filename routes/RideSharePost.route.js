import { Router } from "express";
import { createRideShare, deleteRideShare, updateRideShare } from "../controllers/RideShare/RideShare.controllers";
import { getActiveRides, getAllRides, getRideById } from "../controllers/RideShare/RideSharePost.controller";

const rideSharePostRouter = Router();

rideSharePostRouter.post("/createPost", upload.single("image"), createRideShare);
rideSharePostRouter.get("/getAllPost", getAllRides);
rideSharePostRouter.get("/active", getActiveRides);
rideSharePostRouter.get("/getPost/:id", getRideById);
rideSharePostRouter.put("/updatePost/:id", updateRideShare);
rideSharePostRouter.delete("/deletePost/:id", deleteRideShare);

export default rideSharePostRouter;
