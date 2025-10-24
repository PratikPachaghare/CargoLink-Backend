import mongoose from "mongoose";

const rideShareSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
      trim: true,
    },
    to: {
      type: String,
      required: true,
      trim: true,
    },
    fromCoordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    toCoordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    vehicle: {
      type: String,
      required: true,
      trim: true,
    },
    vehicleNumber: {
      type: String,
      trim: true,
    },
    driver: {
      type: String,
      required: true,
      trim: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    driverContact: {
      type: String,
      trim: true,
    },
    availableWeight: {
      type: String,
      required: true,
    },
    totalCapacity: {
      type: String,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    estimatedArrival: {
      type: Date,
    },
    fuelType: {
      type: String,
      enum: ["Diesel", "Petrol", "CNG", "Electric"],
      default: "Diesel",
    },
    distance: {
      type: String,
    },
    pricePerKm: {
      type: Number,
    },
    totalPriceEstimate: {
      type: Number,
    },
    image: {
      type: String, // Cloudinary or local image URL
    },
    status: {
      type: String,
      enum: ["Scheduled", "On Route", "Completed", "Cancelled"],
      default: "Scheduled",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // or "Driver" depending on your user model
    },
  },
  { timestamps: true }
);

const RideSharePost = mongoose.model("RideSharePost", rideShareSchema);
export default RideSharePost;