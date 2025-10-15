import mongoose from "mongoose";

const deliveryRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  cargoDetails: {
    type: { type: String },
    weight: { type: Number },
    size: { type: String }
  },
  status: { type: String, enum: ["pending", "accepted", "inTransit", "delivered"], default: "pending" },
  assignedDriverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const DeliveryRequest = mongoose.model("DeliveryRequest", deliveryRequestSchema);

export default DeliveryRequest;