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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const profile_entity_1 = require("./profile.entity");
const uuid_1 = require("uuid");
let ProfileService = class ProfileService {
    constructor(profileModel) {
        this.profileModel = profileModel;
    }
    getProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.profileModel.findOne({
                where: { userId },
            });
        });
    }
    createProfile(createProfileDto, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield this.profileModel.findOne({
                where: { userId: user.id },
            });
            if (profile) {
                throw new common_1.NotFoundException('Profile already exists');
            }
            return this.profileModel.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createProfileDto), { userId: user.id }));
        });
    }
    updateProfile(updateProfileDto, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield this.profileModel.findOne({
                where: { userId: user.id },
            });
            if (!profile) {
                throw new common_1.NotFoundException('Profile not found');
            }
            return profile.update(updateProfileDto);
        });
    }
    deleteProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield this.profileModel.findOne({
                where: { userId },
            });
            if (!profile) {
                throw new common_1.NotFoundException('Profile not found');
            }
            yield profile.destroy();
        });
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(profile_entity_1.Profile)),
    __metadata("design:paramtypes", [Object])
], ProfileService);
//# sourceMappingURL=profile.service.js.map