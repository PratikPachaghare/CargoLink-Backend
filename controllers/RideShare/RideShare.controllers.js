import RideShare from "../models/RideShare.js";
import mongoose from "mongoose";

// ✅ Create a new RideShare entry
export const createRideShare = async (req, res) => {
  try {
    const {
      driverId,
      vehicleId,
      pickupLocation,
      dropLocation,
      availableSpace,
      pricePerUnit,
    } = req.body;

    // Validation
    if (
      !driverId ||
      !vehicleId ||
      !pickupLocation ||
      !dropLocation ||
      !availableSpace ||
      !pricePerUnit
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const rideShare = await RideShare.create({
      driverId,
      vehicleId,
      pickupLocation,
      dropLocation,
      availableSpace,
      pricePerUnit,
    });

    res.status(201).json({
      message: "Ride share created successfully",
      data: rideShare,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all ride shares (optional filter by status or location)
export const getAllRideShares = async (req, res) => {
  try {
    const { status, pickup, drop } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (pickup) filter.pickupLocation = new RegExp(pickup, "i");
    if (drop) filter.dropLocation = new RegExp(drop, "i");

    const rideShares = await RideShare.find(filter)
      .populate("driverId", "name email phone")
      .populate("vehicleId", "vehicleNumber vehicleType");

    res.status(200).json({ data: rideShares });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get single ride share by ID
export const getRideShareById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid RideShare ID" });

    const rideShare = await RideShare.findById(id)
      .populate("driverId", "name email phone")
      .populate("vehicleId", "vehicleNumber vehicleType");

    if (!rideShare)
      return res.status(404).json({ message: "Ride share not found" });

    res.status(200).json({ data: rideShare });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update ride share details (price, space, locations)
export const updateRideShare = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await RideShare.findByIdAndUpdate(id, updates, {
      new: true,
    })
      .populate("driverId", "name email")
      .populate("vehicleId", "vehicleNumber vehicleType");

    if (!updated)
      return res.status(404).json({ message: "Ride share not found" });

    res.status(200).json({
      message: "Ride share updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update ride share status (active, booked, completed)
export const updateRideShareStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["active", "booked", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updated = await RideShare.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Ride share not found" });

    res.status(200).json({
      message: `Ride share status updated to ${status}`,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update available space (after booking or cancellation)
export const updateAvailableSpace = async (req, res) => {
  try {
    const { id } = req.params;
    const { space } = req.body;

    if (typeof space !== "number" || space < 0) {
      return res.status(400).json({ message: "Invalid space value" });
    }

    const rideShare = await RideShare.findById(id);
    if (!rideShare)
      return res.status(404).json({ message: "Ride share not found" });

    rideShare.availableSpace = space;
    await rideShare.save();

    res.status(200).json({
      message: "Available space updated successfully",
      data: rideShare,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete ride share
export const deleteRideShare = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await RideShare.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Ride share not found" });

    res.status(200).json({ message: "Ride share deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
