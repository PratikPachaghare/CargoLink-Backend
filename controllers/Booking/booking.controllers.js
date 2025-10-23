import Booking from "../../models/Booking.model.js";
import mongoose from "mongoose";

//  Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { deliveryRequestId, rideShareId, price } = req.body;

    if (!deliveryRequestId || !price) {
      return res.status(400).json({ message: "Delivery Request ID and price are required" });
    }

    const booking = await Booking.create({
      deliveryRequestId,
      rideShareId,
      price,
    });

    res.status(201).json({
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Get all bookings (optional filter by status)
export const getAllBookings = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const bookings = await Booking.find(filter)
      .populate("deliveryRequestId")
      .populate("rideShareId");

    res.status(200).json({ data: bookings });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(id)
      .populate("deliveryRequestId")
      .populate("rideShareId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ data: booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Update booking details (price, rideShareId, etc.)
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(id, updates, {
      new: true,
    })
      .populate("deliveryRequestId")
      .populate("rideShareId");

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updated = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: `Booking status updated to ${status}`,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Booking.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
