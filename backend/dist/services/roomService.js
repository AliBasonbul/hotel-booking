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
class RoomService {
    createRoom(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.room.create({
                data: {
                    number: data.number,
                    type: data.type,
                    status: data.status,
                },
            });
        });
    }
    getBookedRooms() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.room.findMany({
                where: {
                    status: "BOOKED",
                },
            });
        });
    }
    getAllRooms() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.room.findMany();
        });
    }
    deleteRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield db_1.default.room.findUnique({ where: { id: roomId } });
            if (!room) {
                throw new Error("Room not found");
            }
            yield db_1.default.room.delete({ where: { id: roomId } });
            return { message: "Room deleted successfully" };
        });
    }
}
exports.default = new RoomService();
