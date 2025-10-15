import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  deliveryRequestId: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryRequest", required: true },
  rideShareId: { type: mongoose.Schema.Types.ObjectId, ref: "RideShare" },
  status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending" },
  price: { type: Number, required: true },
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;