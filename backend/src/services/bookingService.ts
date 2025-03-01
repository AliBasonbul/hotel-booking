import prisma from "../config/db";

class BookingService {
    async createBooking(userId: string, roomId: string, checkIn: Date, checkOut: Date) {
        
        const room = await prisma.room.findUnique({ where: { id: roomId } });
        if (!room || room.status !== "AVAILABLE") {
            throw new Error("Room is not available for booking.");
        }

        
        const booking = await prisma.booking.create({
            data: {
                userId,
                roomId,
                checkIn,
                checkOut,
                status: "PENDING",
            },
        });

       
        await prisma.room.update({
            where: { id: roomId },
            data: { status: "BOOKED" },
        });

        return booking;
    }

    async getUserBookings(userId: string) {
        return await prisma.booking.findMany({
            where: { userId },
            include: { room: true },
        });
    }

    async cancelBooking(bookingId: string, userId: string) {
        
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { room: true },
        });

        if (!booking || booking.userId !== userId) {
            throw new Error("Booking not found or unauthorized.");
        }

        
        await prisma.booking.update({
            where: { id: bookingId },
            data: { status: "CANCELLED" },
        });

        
        await prisma.room.update({
            where: { id: booking.roomId },
            data: { status: "AVAILABLE" },
        });

        return { message: "Booking cancelled successfully." };
    }
}

export default new BookingService();
