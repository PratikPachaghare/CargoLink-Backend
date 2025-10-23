import mongoose from "mongoose";

const deliveryRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  cargoDetails: {
    type: { type: String },
    productName: { type: String },
    weight: { type: Number },
    size: { 
      sizeType:{type: String, required: true}, 
      height: { type: Number},
      width: { type: Number },
      depth: { type: Number }
     }
  },
  status: { type: String, enum: ["pending", "accepted", "inTransit", "delivered"], default: "pending" },
  assignedDriverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const DeliveryRequest = mongoose.model("DeliveryRequest", deliveryRequestSchema);

export default DeliveryRequest;