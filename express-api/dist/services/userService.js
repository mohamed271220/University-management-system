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
const User_1 = __importDefault(require("../models/User"));
const CustomError_1 = require("../utils/CustomError");
class UserService {
    constructor(userRepository = User_1.default) {
        this.userRepository = userRepository;
    }
    getAllUsers() {
        return __awaiter(this, arguments, void 0, function* (limit = 10, offset = 0) {
            const { count, rows: users } = yield this.userRepository.findAndCountAll({
                attributes: { exclude: ["passwordHash"] },
                limit,
                offset,
            });
            const totalPages = Math.ceil(count / limit);
            const currentPage = Math.ceil(offset / limit) + 1;
            const hasNextPage = currentPage < totalPages;
            const hasPreviousPage = currentPage > 1;
            const pagination = {
                totalItems: count,
                itemsPerPage: limit,
                currentPage: currentPage,
                totalPages: totalPages,
                hasNextPage: hasNextPage,
                hasPreviousPage: hasPreviousPage,
                nextPage: hasNextPage ? currentPage + 1 : null,
                previousPage: hasPreviousPage ? currentPage - 1 : null,
            };
            return { users, pagination };
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByPk(id, {
                attributes: { exclude: ["passwordHash"] },
            });
            if (!user)
                throw new CustomError_1.CustomError("User not found", 404);
            return user;
        });
    }
    updateUser(id, updates, reqUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByPk(id);
            if (!user)
                throw new CustomError_1.CustomError("User not found", 404);
            if (!reqUser.user)
                throw new CustomError_1.CustomError("Unauthorized", 401);
            if ((reqUser.user.role === "student" && reqUser.user.id !== user.id) ||
                ["professor", "staff", "admin"].indexOf(reqUser.user.role) === -1) {
                throw new CustomError_1.CustomError("Unauthorized", 401);
            }
            if (updates.username)
                user.username = updates.username;
            if (updates.email)
                user.email = updates.email;
            if (updates.role && reqUser.user.role === "admin")
                user.role = updates.role;
            yield user.save();
            return user;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByPk(id);
            if (!user)
                throw new CustomError_1.CustomError("User not found", 404);
            yield user.destroy();
        });
    }
}
exports.default = UserService;
