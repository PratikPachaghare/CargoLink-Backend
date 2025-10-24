// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: {
      type: String,
      enum: ["user","driver"],
      default: "user",
    },
    profileImage: { type: String },
    dob: { type: Date }, // Date of birth
    gender: { type: String, enum: ["male", "female", "other"] }, // Gender
    address: { type: String }, // Optional: can store address
    isVerified: { type: Boolean, default: false } // Optional: email verification flag
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
