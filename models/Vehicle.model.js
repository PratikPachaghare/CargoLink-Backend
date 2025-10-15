import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  capacity: { type: Number, required: true },
  availabilityStatus: { type: String, enum: ["available", "unavailable"], default: "available" },
}, { timestamps: true });

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;