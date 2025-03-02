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
const roomService_1 = __importDefault(require("../services/roomService"));
class RoomController {
    createRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { number, type, status } = req.body;
                const newRoom = yield roomService_1.default.createRoom({ number, type, status });
                res.status(201).json(newRoom);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getBookedRooms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield roomService_1.default.getBookedRooms();
                res.status(200).json(rooms);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    getRooms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield roomService_1.default.getAllRooms();
                res.json(rooms);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { roomId } = req.params;
                const result = yield roomService_1.default.deleteRoom(roomId);
                res.json(result);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.default = new RoomController();
