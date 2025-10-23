import RideShare from "../../models/RideShare.model";
import { uplodsOnCloudinary } from "../../utils/cloudinaryUpload.js";
import fs from "fs";

// 📦 Create RideShare with Cloudinary image upload
export const createRideShare = async (req, res) => {
  try {
    const {
      from,
      to,
      fromCoordinates,
      toCoordinates,
      vehicle,
      vehicleNumber,
      driver,
      driverContact,
      availableWeight,
      totalCapacity,
      departureTime,
      estimatedArrival,
      fuelType,
      distance,
      pricePerKm,
      totalPriceEstimate,
      status,
      createdBy,
    } = req.body;

    //  Handle file upload (Multer gives req.file.path)
    let imageUrl = null;
    if (req.file) {
      const uploadRes = await uplodsOnCloudinary(req.file.path);
      if (uploadRes && uploadRes.url) {
        imageUrl = uploadRes.url;
        fs.unlinkSync(req.file.path); // remove local temp file after upload
      }
    }

    const newRide = new RideShare({
      from,
      to,
      fromCoordinates,
      toCoordinates,
      vehicle,
      vehicleNumber,
      driver,
      driverContact,
      availableWeight,
      totalCapacity,
      departureTime,
      estimatedArrival,
      fuelType,
      distance,
      pricePerKm,
      totalPriceEstimate,
      image: imageUrl,
      status,
      createdBy,
    });

    const savedRide = await newRide.save();
    res.status(201).json({
      success: true,
      message: "Ride created successfully",
      data: savedRide,
    });
  } catch (error) {
    console.error("Error creating ride:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create ride",
      error: error.message,
    });
  }
};

//  Get all rides (with optional filters)
export const getAllRides = async (req, res) => {
  try {
    const { from, to, status } = req.query;

    const filter = {};
    if (from) filter.from = { $regex: from, $options: "i" };
    if (to) filter.to = { $regex: to, $options: "i" };
    if (status) filter.status = status;

    const rides = await RideShare.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: rides.length, data: rides });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch rides",
        error: error.message,
      });
  }
};

//  Get a single ride by ID
export const getRideById = async (req, res) => {
  try {
    const ride = await RideShare.findById(req.params.id);
    if (!ride) {
      return res
        .status(404)
        .json({ success: false, message: "Ride not found" });
    }
    res.status(200).json({ success: true, data: ride });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching ride",
        error: error.message,
      });
  }
};

// ✏️ Update ride details
export const updateRideShare = async (req, res) => {
  try {
    const updatedRide = await RideShare.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedRide) {
      return res
        .status(404)
        .json({ success: false, message: "Ride not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Ride updated successfully",
        data: updatedRide,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update ride",
        error: error.message,
      });
  }
};

//  Delete a ride
export const deleteRideShare = async (req, res) => {
    const { id } = req.params;

  try {
    const deletedRide = await RideShare.findByIdAndDelete(id);
    if (!deletedRide) {
      return res
        .status(404)
        .json({ success: false, message: "Ride not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Ride deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to delete ride",
        error: error.message,
      });
  }
};

//  Get active or ongoing rides
export const getActiveRides = async (req, res) => {
  try {
    const activeRides = await RideShare.find({
      status: { $in: ["Scheduled", "On Route"] },
    });
    res
      .status(200)
      .json({ success: true, count: activeRides.length, data: activeRides });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch active rides",
        error: error.message,
      });
  }
};
