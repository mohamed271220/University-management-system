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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourseCache = exports.updateCourseCache = exports.getCourseCacheByDepartment = exports.getCourseCacheByCourse = exports.getAllCourseCaches = exports.getCourseCacheById = exports.createCourseCache = void 0;
const courseCacheService_1 = require("../services/courseCacheService");
const courseCacheService = new courseCacheService_1.CourseCacheService();
const createCourseCache = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseCache = yield courseCacheService.createCourseCache(req.body);
        res
            .status(201)
            .json({ message: "Course cache created successfully", courseCache });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.createCourseCache = createCourseCache;
const getCourseCacheById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const courseCache = yield courseCacheService.getCourseCacheById(id);
        res
            .status(200)
            .json({ message: "Course cache fetched successfully", courseCache });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getCourseCacheById = getCourseCacheById;
const getAllCourseCaches = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseCaches = yield courseCacheService.getAllCourseCaches();
        res
            .status(200)
            .json({ message: "Course caches fetched successfully", courseCaches });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getAllCourseCaches = getAllCourseCaches;
const getCourseCacheByCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        const courseCaches = yield courseCacheService.getCourseCacheByCourse(courseId);
        res
            .status(200)
            .json({ message: "Course caches fetched successfully", courseCaches });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getCourseCacheByCourse = getCourseCacheByCourse;
const getCourseCacheByDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { departmentId } = req.params;
        const courseCaches = yield courseCacheService.getCourseCacheByDepartment(departmentId);
        res
            .status(200)
            .json({ message: "Course caches fetched successfully", courseCaches });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getCourseCacheByDepartment = getCourseCacheByDepartment;
const updateCourseCache = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseCache = yield courseCacheService.updateCourseCache(req.body);
        res
            .status(200)
            .json({ message: "Course cache updated successfully", courseCache });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.updateCourseCache = updateCourseCache;
const deleteCourseCache = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const courseCache = yield courseCacheService.deleteCourseCache(id);
        res
            .status(200)
            .json({ message: "Course cache deleted successfully", courseCache });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.deleteCourseCache = deleteCourseCache;
