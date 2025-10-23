import mongoose from "mongoose";
import DeliveryRequest from "../../models/DeliveryRequest.model.js";

// Create a new delivery request
export const createDeliveryRequest = async (req, res) => {
  try {
    const { userId, pickupLocation, dropLocation, cargoDetails } = req.body;

    if (!userId || !pickupLocation || !dropLocation) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newRequest = await DeliveryRequest.create({
      userId,
      pickupLocation,
      dropLocation,
      cargoDetails,
    });

    res.status(201).json({
      message: "Delivery request created successfully",
      data: newRequest,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Get all delivery requests (optionally filter by status)
export const getAllDeliveryRequests = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const requests = await DeliveryRequest.find(filter)
      .populate("userId", "name email")
      .populate("assignedDriverId", "name email");

    res.status(200).json({ data: requests });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Get single delivery request by ID
export const getDeliveryRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID format" });

    const request = await DeliveryRequest.findById(id)
      .populate("userId", "name email")
      .populate("assignedDriverId", "name email");

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.status(200).json({ data: request });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Update delivery request details
export const updateDeliveryRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await DeliveryRequest.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Request not found" });

    res.status(200).json({
      message: "Delivery request updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Assign driver to a delivery request
export const assignDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { driverId } = req.body;

    if (!driverId)
      return res.status(400).json({ message: "Driver ID is required" });

    const updatedRequest = await DeliveryRequest.findByIdAndUpdate(
      id,
      { assignedDriverId: driverId, status: "accepted" },
      { new: true }
    ).populate("assignedDriverId", "name email");

    if (!updatedRequest)
      return res.status(404).json({ message: "Request not found" });

    res.status(200).json({
      message: "Driver assigned successfully",
      data: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Update delivery status
export const updateDeliveryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "accepted", "inTransit", "delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await DeliveryRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Request not found" });

    res.status(200).json({
      message: `Delivery status updated to ${status}`,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Delete a delivery request
export const deleteDeliveryRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await DeliveryRequest.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Request not found" });

    res.status(200).json({ message: "Delivery request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
