"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = __importDefault(require("../controllers/bookingController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.get("/", authMiddleware_1.authenticateUser, bookingController_1.default.getUserBookings);
router.post("/create", authMiddleware_1.authenticateUser, bookingController_1.default.createBooking);
router.delete("/:bookingId", authMiddleware_1.authenticateUser, bookingController_1.default.cancelBooking);
exports.default = router;
