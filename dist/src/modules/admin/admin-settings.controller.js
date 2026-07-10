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
exports.AdminSettingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_settings_service_1 = require("./admin-settings.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let AdminSettingsController = class AdminSettingsController {
    settingsService;
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    getAllSettings() {
        return this.settingsService.getAllSettings();
    }
    getSetting(key) {
        return this.settingsService.getSetting(key);
    }
    updateSetting(key, body) {
        return this.settingsService.updateSetting(key, body.value);
    }
};
exports.AdminSettingsController = AdminSettingsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all settings' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "getAllSettings", null);
__decorate([
    (0, common_1.Get)(':key'),
    (0, swagger_1.ApiOperation)({ summary: 'Get setting by key' }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "getSetting", null);
__decorate([
    (0, common_1.Put)(':key'),
    (0, swagger_1.ApiOperation)({ summary: 'Update or create a setting' }),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminSettingsController.prototype, "updateSetting", null);
exports.AdminSettingsController = AdminSettingsController = __decorate([
    (0, swagger_1.ApiTags)('Admin Settings'),
    (0, common_1.Controller)('admin/settings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [admin_settings_service_1.AdminSettingsService])
], AdminSettingsController);
//# sourceMappingURL=admin-settings.controller.js.map