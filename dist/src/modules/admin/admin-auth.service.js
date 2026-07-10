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
var AdminAuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthService = void 0;
const common_1 = require("@nestjs/common");
const admin_repository_1 = require("./admin.repository");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const common_2 = require("@nestjs/common");
let AdminAuthService = AdminAuthService_1 = class AdminAuthService {
    adminRepository;
    jwtService;
    configService;
    logger = new common_2.Logger(AdminAuthService_1.name);
    constructor(adminRepository, jwtService, configService) {
        this.adminRepository = adminRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async onModuleInit() {
        const defaultEmail = 'admin@divado.com';
        const existingAdmin = await this.adminRepository.findByEmail(defaultEmail);
        if (!existingAdmin) {
            this.logger.log('Seeding default admin user...');
            const passwordHash = await bcrypt.hash('12345678', 10);
            await this.adminRepository.create({
                email: defaultEmail,
                name: 'Super Admin',
                password: passwordHash,
            });
            this.logger.log('Default admin user created successfully.');
        }
    }
    async login(dto) {
        const admin = await this.adminRepository.findByEmail(dto.email);
        if (!admin || admin.isDeleted) {
            throw new common_1.UnauthorizedException('Invalid admin credentials');
        }
        const isMatch = await bcrypt.compare(dto.password, admin.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid admin credentials');
        }
        const tokens = await this.generateTokens(admin.guid, admin.email, 'ADMIN');
        const { password: _password, ...profile } = admin;
        return { profile, tokens };
    }
    async generateTokens(userId, email, role) {
        const payload = { sub: userId, email, role };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: '1d',
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            }),
        ]);
        return { accessToken, refreshToken };
    }
};
exports.AdminAuthService = AdminAuthService;
exports.AdminAuthService = AdminAuthService = AdminAuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AdminAuthService);
//# sourceMappingURL=admin-auth.service.js.map