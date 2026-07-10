"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let AdminProfileService = class AdminProfileService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(adminId) {
        const admin = await this.prisma.admin.findUnique({
            where: { guid: adminId },
            select: { guid: true, name: true, email: true, createdAt: true },
        });
        if (!admin)
            throw new common_1.NotFoundException('Admin not found');
        return admin;
    }
    async updateProfile(adminId, name, email) {
        return this.prisma.admin.update({
            where: { guid: adminId },
            data: { name, email },
            select: { guid: true, name: true, email: true },
        });
    }
    async updatePassword(adminId, oldPassword, newPassword) {
        const admin = await this.prisma.admin.findUnique({ where: { guid: adminId } });
        if (!admin)
            throw new common_1.NotFoundException('Admin not found');
        const isValid = await bcrypt.compare(oldPassword, admin.password);
        if (!isValid)
            throw new common_1.BadRequestException('Incorrect old password');
        const hashed = await bcrypt.hash(newPassword, 10);
        await this.prisma.admin.update({
            where: { guid: adminId },
            data: { password: hashed },
        });
        return { success: true };
    }
};
exports.AdminProfileService = AdminProfileService;
exports.AdminProfileService = AdminProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminProfileService);
//# sourceMappingURL=admin-profile.service.js.map