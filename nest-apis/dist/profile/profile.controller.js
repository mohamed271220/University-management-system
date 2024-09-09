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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const profile_service_1 = require("./profile.service");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/role.guard");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../user/user.entity");
const profile_dto_1 = require("./dto/profile.dto");
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    getProfile(user) {
        return this.profileService.getProfile(user.id);
    }
    createProfile(createProfileDto, user) {
        return this.profileService.createProfile(createProfileDto, user);
    }
    updateProfile(updateProfileDto, user) {
        return this.profileService.updateProfile(updateProfileDto, user);
    }
    deleteProfile(user) {
        return this.profileService.deleteProfile(user.id);
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_dto_1.CreateProfileDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "createProfile", null);
__decorate([
    (0, common_1.Put)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_dto_1.UpdateProfileDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Delete)('/'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "deleteProfile", null);
exports.ProfileController = ProfileController = __decorate([
    (0, common_1.Controller)('api/v1/profile'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map