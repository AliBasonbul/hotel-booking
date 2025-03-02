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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
class UserService {
    authenticateUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const user = yield db_1.default.user.findUnique({ where: { email } });
            if (!user)
                throw new Error("Invalid email or password");
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid)
                throw new Error("Invalid email or password");
            if (!config_1.default.jwtSecret) {
                throw new Error("JWT Secret is not defined in the environment variables");
            }
            const signOptions = {
                expiresIn: config_1.default.jwtExpiration
            };
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.jwtSecret, signOptions);
            return { token };
        });
    }
    createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            return db_1.default.user.create({
                data: { name, email, password: hashedPassword },
            });
        });
    }
}
exports.default = new UserService();
