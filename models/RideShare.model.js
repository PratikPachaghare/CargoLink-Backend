// models/RideShare.js
import mongoose from "mongoose";

const rideShareSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  availableSpace: { type: Number, required: true },
  pricePerUnit: { type: Number, required: true },
  status: { type: String, enum: ["active", "booked", "completed"], default: "active" },
}, { timestamps: true });

const RideShare = mongoose.model("RideShare", rideShareSchema);
export default RideShare;