import prisma from "../config/db";

class RoomService {

    async createRoom(data: { number: string; type: string; status?: any }) {

        return await prisma.room.create({
            data: {
                number: data.number,
                type: data.type,
                status: data.status,
            },
        });
    }

    async getBookedRooms() {
        return await prisma.room.findMany({
            where: {
                status: "BOOKED",
            },
        });
    }

    async getAllRooms() {
        return await prisma.room.findMany();
    }

    async deleteRoom(roomId: string) {
        const room = await prisma.room.findUnique({ where: { id: roomId } });

        if (!room) {
            throw new Error("Room not found");
        }

        await prisma.room.delete({ where: { id: roomId } });

        return { message: "Room deleted successfully" };
    }
}

export default new RoomService();
