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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
const customer_repository_1 = require("../customer/customer.repository");
let AuthService = class AuthService {
    customerRepository;
    jwtService;
    configService;
    constructor(customerRepository, jwtService, configService) {
        this.customerRepository = customerRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(registerDto) {
        const existing = await this.customerRepository.findByPhone(registerDto.phone);
        if (existing) {
            throw new common_1.BadRequestException('Phone number is already registered');
        }
        const passwordHash = await bcrypt.hash(registerDto.password, 10);
        const customer = await this.customerRepository.create({
            phone: registerDto.phone,
            passwordHash,
            name: registerDto.name,
            email: registerDto.email,
            status: 'UNVERIFIED',
        });
        const tokens = await this.generateTokens(customer.id, customer.phone, 'CUSTOMER');
        await this.updateRefreshToken(customer.id, tokens.refreshToken);
        const { ...profile } = customer;
        return { profile, tokens };
    }
    async login(loginDto) {
        const customer = await this.customerRepository.findByPhone(loginDto.phone);
        if (!customer) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(loginDto.password, customer.passwordHash);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (customer.status === 'BLOCKED') {
            throw new common_1.UnauthorizedException('Account is blocked');
        }
        const tokens = await this.generateTokens(customer.id, customer.phone, 'CUSTOMER');
        await this.updateRefreshToken(customer.id, tokens.refreshToken);
        const { ...profile } = customer;
        return { profile, tokens };
    }
    async logout(userId) {
        await this.customerRepository.update(userId, { hashedRefreshToken: null });
        return { message: 'Logged out successfully' };
    }
    async refreshTokens(userId, refreshToken) {
        const customer = await this.customerRepository.findById(userId);
        if (!customer || !customer.hashedRefreshToken) {
            throw new common_1.UnauthorizedException('Access Denied');
        }
        const isMatch = await bcrypt.compare(refreshToken, customer.hashedRefreshToken);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Access Denied');
        }
        const tokens = await this.generateTokens(customer.id, customer.phone, 'CUSTOMER');
        await this.updateRefreshToken(customer.id, tokens.refreshToken);
        return { tokens };
    }
    async changePassword(userId, dto) {
        const customer = await this.customerRepository.findById(userId);
        if (!customer) {
            throw new common_1.UnauthorizedException('Customer not found');
        }
        const isMatch = await bcrypt.compare(dto.oldPassword, customer.passwordHash);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Old password is incorrect');
        }
        const passwordHash = await bcrypt.hash(dto.newPassword, 10);
        await this.customerRepository.update(userId, { passwordHash });
        return { message: 'Password changed successfully' };
    }
    async forgotPassword(dto) {
        await Promise.resolve();
        return { message: 'Password reset instructions sent to ' + dto.phone };
    }
    async generateTokens(userId, phone, role) {
        const payload = { sub: userId, phone, role };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            }),
        ]);
        return { accessToken, refreshToken };
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.customerRepository.update(userId, { hashedRefreshToken });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_repository_1.CustomerRepository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map