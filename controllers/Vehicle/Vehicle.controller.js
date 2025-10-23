
import Vehicle from "../../models/Vehicle.model.js";
import { uplodsOnCloudinary } from "../../utils/cloudinery.js";
import fs from "fs";

// ✅ Register a new vehicle
export const registerVehicle = async (req, res) => {
  try {
    const {
      driverId,
      type,
      registrationNumber,
      vehicleModel,
      vehicleYear,
      capacity,
      fuelType,
      color,
      vehicleCondition,
    } = req.body;

    // Check required fields
    if (
      !driverId ||
      !type ||
      !registrationNumber ||
      !vehicleModel ||
      !vehicleYear ||
      !capacity ||
      !fuelType
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // ✅ Upload images to Cloudinary if present
    let imageUrl = null;
    let rcBookImage = null;
    let insuranceImage = null;

    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        const uploaded = await uplodsOnCloudinary(req.files.image[0].path);
        imageUrl = uploaded?.url;
        fs.unlinkSync(req.files.image[0].path);
      }

      if (req.files.rcBookImage && req.files.rcBookImage[0]) {
        const uploaded = await uplodsOnCloudinary(req.files.rcBookImage[0].path);
        rcBookImage = uploaded?.url;
        fs.unlinkSync(req.files.rcBookImage[0].path);
      }

      if (req.files.insuranceImage && req.files.insuranceImage[0]) {
        const uploaded = await uplodsOnCloudinary(req.files.insuranceImage[0].path);
        insuranceImage = uploaded?.url;
        fs.unlinkSync(req.files.insuranceImage[0].path);
      }
    }

    // ✅ Create vehicle record
    const newVehicle = new Vehicle({
      driverId,
      type,
      registrationNumber,
      vehicleModel,
      vehicleYear,
      capacity,
      fuelType,
      color,
      vehicleCondition,
      imageUrl,
      rcBookImage,
      insuranceImage,
    });

    await newVehicle.save();

    res.status(201).json({
      success: true,
      message: "Vehicle registered successfully",
      data: newVehicle,
    });
  } catch (error) {
    console.error("Error registering vehicle:", error);
    res.status(500).json({
      success: false,
      message: "Server error while registering vehicle",
      error: error.message,
    });
  }
};

// ✅ Get all vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("driverId", "name email phone");
    res.status(200).json({ success: true, data: vehicles });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch vehicles" });
  }
};

// ✅ Get vehicle by ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate(
      "driverId",
      "name email phone"
    );
    if (!vehicle)
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });

    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching vehicle" });
  }
};

// ✅ Update vehicle info
export const updateVehicle = async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVehicle)
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: updatedVehicle,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

// ✅ Delete vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const deleted = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });

    res
      .status(200)
      .json({ success: true, message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};
