"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./userRoute"));
const bookingRoute_1 = __importDefault(require("./bookingRoute"));
const roomRoute_1 = __importDefault(require("./roomRoute"));
const router = express_1.default.Router();
router.use('/user', userRoute_1.default);
router.use('/booking', bookingRoute_1.default);
router.use('/rooms', roomRoute_1.default);
exports.default = router;
