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
exports.HallController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/role.guard");
const hall_service_1 = require("./hall.service");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_hall_dto_1 = require("./dto/create-hall.dto");
const update_hall_dto_1 = require("./dto/update-hall.dto");
let HallController = class HallController {
    constructor(hallService) {
        this.hallService = hallService;
    }
    createHall(createHallDto) {
        return this.hallService.createHall(createHallDto);
    }
    getAllHalls(search, limit, offset) {
        return this.hallService.getAllHalls(search, limit, offset);
    }
    getHall(hallId) {
        return this.hallService.getHallById(hallId);
    }
    getHallLectures(hallId) {
        return this.hallService.getHallLectures(hallId);
    }
    updateHall(hallId, updateHallDto) {
        return this.hallService.updateHall(hallId, updateHallDto);
    }
    deleteHall(hallId) {
        return this.hallService.deleteHall(hallId);
    }
};
exports.HallController = HallController;
__decorate([
    (0, common_1.Post)('/'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hall_dto_1.CreateHallDTO]),
    __metadata("design:returntype", void 0)
], HallController.prototype, "createHall", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], HallController.prototype, "getAllHalls", null);
__decorate([
    (0, common_1.Get)(':hallId'),
    __param(0, (0, common_1.Param)('hallId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HallController.prototype, "getHall", null);
__decorate([
    (0, common_1.Get)(':hallId/lectures'),
    __param(0, (0, common_1.Param)('hallId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HallController.prototype, "getHallLectures", null);
__decorate([
    (0, common_1.Put)(':hallId'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Param)('hallId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hall_dto_1.UpdateHallDTO]),
    __metadata("design:returntype", void 0)
], HallController.prototype, "updateHall", null);
__decorate([
    (0, common_1.Delete)(':hallId'),
    (0, roles_decorator_1.Roles)('Admin', 'Staff'),
    __param(0, (0, common_1.Param)('hallId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HallController.prototype, "deleteHall", null);
exports.HallController = HallController = __decorate([
    (0, common_1.Controller)('api/v1/halls'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [hall_service_1.HallService])
], HallController);
//# sourceMappingURL=hall.controller.js.map