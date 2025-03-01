import { Request, Response } from "express";
import roomService from "../services/roomService";

class RoomController {

    async createRoom(req: Request, res: Response): Promise<void> {
        try {
            const { number, type, status } = req.body;
            const newRoom = await roomService.createRoom({ number, type, status });
            res.status(201).json(newRoom);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getBookedRooms(req: Request, res: Response): Promise<void> {
        try {
            const rooms = await roomService.getBookedRooms();
            res.status(200).json(rooms);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRooms(req: Request, res: Response): Promise<void> {
        try {
            const rooms = await roomService.getAllRooms();
            res.json(rooms);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteRoom(req: Request, res: Response) {
        try {
            const { roomId } = req.params;
            const result = await roomService.deleteRoom(roomId);
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new RoomController();
