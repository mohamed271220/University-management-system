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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const profile_1 = __importDefault(require("../../routes/profile"));
const profileService_1 = require("../../services/profileService");
const authMiddleware_1 = require("../../middleware/authMiddleware");
jest.mock('../../middleware/authMiddleware');
jest.mock('../../services/profileService');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/profile', profile_1.default);
describe('Profile API', () => {
    const mockProfileService = profileService_1.ProfileService;
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('GET /profile/', () => {
        it('should return a profile when authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
            const profileData = {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                dob: '1990-01-01',
                contactNumber: '1234567890',
                address: '123 Main St',
                userId: '1',
            };
            mockProfileService.prototype.getProfile.mockResolvedValue(profileData);
            authMiddleware_1.authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: '1' };
                next();
            });
            const response = yield (0, supertest_1.default)(app).get('/profile/');
            expect(response.status).toBe(200);
            expect(response.body.profile).toEqual(profileData);
        }));
        it('should return 401 if not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
            authMiddleware_1.authenticateToken.mockImplementation((req, res, next) => {
                return res.status(401).json({ message: 'Unauthorized' });
            });
            const response = yield (0, supertest_1.default)(app).get('/profile/');
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Unauthorized');
        }));
    });
    describe('POST /profile/create', () => {
        it('should create a new profile when authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
            const profileData = {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                dob: '1990-01-01',
                contactNumber: '1234567890',
                address: '123 Main St',
                userId: '1',
            };
            mockProfileService.prototype.createProfile.mockResolvedValue(profileData);
            authMiddleware_1.authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: '1' };
                next();
            });
            const response = yield (0, supertest_1.default)(app)
                .post('/profile/create')
                .send(profileData);
            expect(response.status).toBe(201);
            expect(response.body.profile).toEqual(profileData);
        }));
        it('should return 400 if profile data is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Missing required profile data';
            mockProfileService.prototype.createProfile.mockRejectedValue(new Error(errorMessage));
            authMiddleware_1.authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: '1' };
                next();
            });
            const response = yield (0, supertest_1.default)(app)
                .post('/profile/create')
                .send({});
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(errorMessage);
        }));
    });
    describe('PUT /profile/update', () => {
        it('should update an existing profile when authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
            const profileData = {
                id: '1',
                firstName: 'Jane',
                lastName: 'Doe',
                dob: '1990-01-01',
                contactNumber: '1234567890',
                address: '123 Main St',
                userId: '1',
            };
            mockProfileService.prototype.updateProfile.mockResolvedValue(profileData);
            authMiddleware_1.authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: '1' };
                next();
            });
            const response = yield (0, supertest_1.default)(app)
                .put('/profile/update')
                .send(profileData);
            expect(response.status).toBe(200);
            expect(response.body.profile).toEqual(profileData);
        }));
    });
    describe('DELETE /profile/delete', () => {
        it('should delete the profile when authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
            mockProfileService.prototype.deleteProfile.mockResolvedValue();
            authMiddleware_1.authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: '1' };
                next();
            });
            const response = yield (0, supertest_1.default)(app).delete('/profile/delete');
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Profile deleted successfully');
        }));
        it('should return 401 if not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
            authMiddleware_1.authenticateToken.mockImplementation((req, res, next) => {
                return res.status(401).json({ message: 'Unauthorized' });
            });
            const response = yield (0, supertest_1.default)(app).delete('/profile/delete');
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Unauthorized');
        }));
    });
});
