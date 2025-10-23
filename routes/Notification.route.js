import express from "express";
import { createNotification, getUserNotifications, markAsRead, deleteNotification } from "../controllers/Notification/userNotification.controller.js";

const notificationRouter = express.Router();

notificationRouter.post("/create", createNotification);

notificationRouter.get("/:userId", getUserNotifications);

notificationRouter.put("/read/:id", markAsRead);

notificationRouter.delete("/:id", deleteNotification);

export default notificationRouter;
