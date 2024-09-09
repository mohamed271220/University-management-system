"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../user/user.entity");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const uuid_1 = require("uuid");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    signUp(authCredentialsDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, email } = authCredentialsDto;
            const existingUser = yield user_entity_1.User.findOne({ where: { username } });
            if (existingUser) {
                throw new common_1.ConflictException('Username already exists');
            }
            const hashedPassword = yield bcrypt.hash(password, 10);
            try {
                yield user_entity_1.User.create({
                    id: (0, uuid_1.v4)(),
                    username,
                    passwordHash: hashedPassword,
                    email,
                    role: 'Student',
                });
            }
            catch (error) {
                common_1.Logger.error('Failed to create user', error.stack);
                throw new common_1.InternalServerErrorException();
            }
        });
    }
    signIn(authCredentialsDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = authCredentialsDto;
            const user = yield user_entity_1.User.findOne({ where: { username } });
            if (user && (yield bcrypt.compare(password, user.passwordHash))) {
                const payload = { username, role: user.role };
                const accessToken = this.jwtService.sign(payload, {
                    secret: 'secret',
                });
                return { accessToken };
            }
            else {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
        });
    }
    logOut() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map