import { Response } from "express";
import bookingService from "../services/bookingService";
import { AuthRequest } from "../middlewares/authMiddleware";

class BookingController {
  async createBooking(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const { roomId, checkIn, checkOut } = req.body;
      const booking = await bookingService.createBooking(
        req.user.id,
        roomId,
        new Date(checkIn),
        new Date(checkOut)
      );
      res.status(201).json(booking);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserBookings(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const bookings = await bookingService.getUserBookings(req.user.id);
      res.json(bookings);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async cancelBooking(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const { bookingId } = req.params;
      const result = await bookingService.cancelBooking(bookingId, req.user.id);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new BookingController();
