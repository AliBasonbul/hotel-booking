import express from "express";
import bookingController from "../controllers/bookingController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authenticateUser, bookingController.getUserBookings);
router.post("/create", authenticateUser, bookingController.createBooking);
router.delete("/:bookingId", authenticateUser, bookingController.cancelBooking);

export default router;
