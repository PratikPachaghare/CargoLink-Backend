import Router from "express";
import { createDeliveryRequest, deleteDeliveryRequest, getAllDeliveryRequests, getDeliveryRequestById, updateDeliveryRequest, updateDeliveryStatus } from "../controllers/Delivery/Requast.controllers.js";

const deliveryRouter = Router();

deliveryRouter.post("/request/createRequest", createDeliveryRequest);

deliveryRouter.get("/request/allRequests" , getAllDeliveryRequests);

deliveryRouter.get("/request/:id", getDeliveryRequestById);

deliveryRouter.patch("/request/updateRequaest/:id", updateDeliveryRequest);

deliveryRouter.patch("/request/updateStatus/:id", updateDeliveryStatus);

deliveryRouter.patch("/request/assignDriver/:id", updateDeliveryRequest);

deliveryRouter.delete("/request/deleteRequaest/:id", deleteDeliveryRequest);

export default deliveryRouter;