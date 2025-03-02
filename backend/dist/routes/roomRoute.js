"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomController_1 = __importDefault(require("../controllers/roomController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.get("/booked", authMiddleware_1.authenticateUser, roomController_1.default.getBookedRooms);
router.get("/", authMiddleware_1.authenticateUser, roomController_1.default.getRooms);
router.post("/create", authMiddleware_1.authenticateUser, roomController_1.default.createRoom);
router.delete("/:roomId", authMiddleware_1.authenticateUser, roomController_1.default.deleteRoom);
exports.default = router;
