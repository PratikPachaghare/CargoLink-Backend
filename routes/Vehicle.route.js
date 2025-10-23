import express from "express";
import multer from "multer";
import {
  registerVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controllers/Vehicle/Vehicle.controller.js";

const vehicleRouter = express.Router();
const upload = multer({ dest: "uploads/" });

// Multiple fields upload
const vehicleUploads = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "rcBookImage", maxCount: 1 },
  { name: "insuranceImage", maxCount: 1 },
]);

// Routes
vehicleRouter.post("/register", vehicleUploads, registerVehicle);
vehicleRouter.get("/getAllVehicles", getAllVehicles);
vehicleRouter.get("/vehicleById/:id", getVehicleById);
vehicleRouter.put("/updateVehicle/:id", updateVehicle);
vehicleRouter.delete("/delete/:id", deleteVehicle);

export default vehicleRouter;
