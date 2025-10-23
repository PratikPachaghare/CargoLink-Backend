import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Basic vehicle details
    type: {
      type: String,
      required: true,
      enum: ["Truck", "Mini Truck", "Tempo", "Pickup", "Container", "Other"],
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    vehicleYear: {
      type: Number,
      required: true,
    },

    // Capacity details
    capacity: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["Diesel", "Petrol", "CNG", "Electric", "Other"],
      required: true,
    },

    // Image uploads (via Cloudinary)
    imageUrl: {
      type: String,
      default: null,
    },
    rcBookImage: {
      type: String,
      default: null,
    },
    insuranceImage: {
      type: String,
      default: null,
    },

    // Additional details
    color: {
      type: String,
      default: "Not specified",
    },
    vehicleCondition: {
      type: String,
      enum: ["Good", "Average", "Needs Maintenance"],
      default: "Good",
    },

    // Availability
    availabilityStatus: {
      type: String,
      enum: ["available", "unavailable", "onRoute"],
      default: "available",
    },

    // Verification
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
