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
const db_1 = __importDefault(require("../config/db"));
class BookingService {
    createBooking(userId, roomId, checkIn, checkOut) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield db_1.default.room.findUnique({ where: { id: roomId } });
            if (!room || room.status !== "AVAILABLE") {
                throw new Error("Room is not available for booking.");
            }
            const booking = yield db_1.default.booking.create({
                data: {
                    userId,
                    roomId,
                    checkIn,
                    checkOut,
                    status: "PENDING",
                },
            });
            yield db_1.default.room.update({
                where: { id: roomId },
                data: { status: "BOOKED" },
            });
            return booking;
        });
    }
    getUserBookings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.booking.findMany({
                where: { userId },
                include: { room: true },
            });
        });
    }
    cancelBooking(bookingId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield db_1.default.booking.findUnique({
                where: { id: bookingId },
                include: { room: true },
            });
            if (!booking || booking.userId !== userId) {
                throw new Error("Booking not found or unauthorized.");
            }
            yield db_1.default.booking.update({
                where: { id: bookingId },
                data: { status: "CANCELLED" },
            });
            yield db_1.default.room.update({
                where: { id: booking.roomId },
                data: { status: "AVAILABLE" },
            });
            return { message: "Booking cancelled successfully." };
        });
    }
}
exports.default = new BookingService();
