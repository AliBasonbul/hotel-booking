"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookingService_1 = __importDefault(require("../services/bookingService"));
class BookingController {
    createBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({ message: "Unauthorized" });
                    return;
                }
                const { roomId, checkIn, checkOut } = req.body;
                const booking = yield bookingService_1.default.createBooking(req.user.id, roomId, new Date(checkIn), new Date(checkOut));
                res.status(201).json(booking);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getUserBookings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({ message: "Unauthorized" });
                    return;
                }
                const bookings = yield bookingService_1.default.getUserBookings(req.user.id);
                res.json(bookings);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    cancelBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({ message: "Unauthorized" });
                    return;
                }
                const { bookingId } = req.params;
                const result = yield bookingService_1.default.cancelBooking(bookingId, req.user.id);
                res.json(result);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.default = new BookingController();
