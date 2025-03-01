import express from "express";
import roomController from "../controllers/roomController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();


router.get("/booked", authenticateUser, roomController.getBookedRooms);
router.get("/", authenticateUser, roomController.getRooms);
router.post("/create", authenticateUser, roomController.createRoom);
router.delete("/:roomId", authenticateUser, roomController.deleteRoom); 
export default router;
