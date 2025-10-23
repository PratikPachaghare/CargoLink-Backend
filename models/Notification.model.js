import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",  // can be User, Driver, or Admin
      required: true 
    },
    type: { 
      type: String, 
      enum: ["rideBooked", "rideAssigned", "deliveryUpdate", "payment", "systemAlert"], 
      required: true 
    },
    title: { 
      type: String, 
      required: true 
    },
    message: { 
      type: String, 
      required: true 
    },
    relatedId: { 
      type: mongoose.Schema.Types.ObjectId, 
      refPath: "type", // dynamically link to Ride, Delivery, Payment
      default: null 
    },
    link: { 
      type: String, 
      default: null 
    },
    priority: { 
      type: String, 
      enum: ["low", "medium", "high"], 
      default: "medium" 
    },
    isRead: { 
      type: Boolean, 
      default: false 
    },
    isDeleted: { 
      type: Boolean, 
      default: false 
    }
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
