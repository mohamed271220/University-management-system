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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLectureDTO = void 0;
const class_validator_1 = require("class-validator");
class CreateLectureDTO {
}
exports.CreateLectureDTO = CreateLectureDTO;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLectureDTO.prototype, "courseId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLectureDTO.prototype, "professorId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLectureDTO.prototype, "hallId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)([
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ]),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLectureDTO.prototype, "dayOfWeek", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'Invalid start time format',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLectureDTO.prototype, "startTime", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'Invalid end time format',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLectureDTO.prototype, "endTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLectureDTO.prototype, "recurrencePattern", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateLectureDTO.prototype, "recurrenceEndDate", void 0);
//# sourceMappingURL=create-lecture.dto.js.map