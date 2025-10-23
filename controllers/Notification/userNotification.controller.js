import Notification from "../../models/Notification.model";


// ✅ Create a notification
export const createNotification = async (req, res) => {
  try {
    const { userId, type, title, message, relatedId, link, priority } = req.body;

    if (!userId || !type || !title || !message) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const notification = await Notification.create({
      userId,
      type,
      title,
      message,
      relatedId: relatedId || null,
      link: link || null,
      priority: priority || "medium"
    });

    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get notifications for a user
export const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId, isDeleted: false }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch notifications" });
  }
};

// ✅ Mark a notification as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
    if (!notification) return res.status(404).json({ success: false, message: "Notification not found" });

    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to mark notification as read" });
  }
};

// ✅ Soft delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!notification) return res.status(404).json({ success: false, message: "Notification not found" });

    res.status(200).json({ success: true, message: "Notification deleted", data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete notification" });
  }
};
