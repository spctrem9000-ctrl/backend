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
exports.AdminExtraController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const extra_service_1 = require("../services/extra.service");
const create_extra_group_dto_1 = require("../dto/create-extra-group.dto");
const update_extra_group_dto_1 = require("../dto/update-extra-group.dto");
const create_extra_dto_1 = require("../dto/create-extra.dto");
const update_extra_dto_1 = require("../dto/update-extra.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
let AdminExtraController = class AdminExtraController {
    extraService;
    constructor(extraService) {
        this.extraService = extraService;
    }
    createGroup(dto, user) {
        return this.extraService.createGroup(dto, user.id);
    }
    getGroups() {
        return this.extraService.getGroups(true);
    }
    updateGroup(id, dto, user) {
        return this.extraService.updateGroup(id, dto, user.id);
    }
    deleteGroup(id, user) {
        return this.extraService.deleteGroup(id, user.id);
    }
    createExtra(groupId, dto, user) {
        return this.extraService.createExtra(groupId, dto, user.id);
    }
    updateExtra(id, dto, user) {
        return this.extraService.updateExtra(id, dto, user.id);
    }
    deleteExtra(id, user) {
        return this.extraService.deleteExtra(id, user.id);
    }
    linkGroupToProduct(productId, groupId) {
        return this.extraService.linkGroupToProduct(productId, groupId);
    }
    unlinkGroupFromProduct(productId, groupId) {
        return this.extraService.unlinkGroupFromProduct(productId, groupId);
    }
};
exports.AdminExtraController = AdminExtraController;
__decorate([
    (0, common_1.Post)('groups'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new Extra Group' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_extra_group_dto_1.CreateExtraGroupDto, Object]),
    __metadata("design:returntype", void 0)
], AdminExtraController.prototype, "createGroup", null);
__decorate([
    (0, common_1.Get)('groups'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Extra Groups' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminExtraController.prototype, "getGroups", null);
__decorate([
    (0, common_1.Patch)('groups/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Extra Group' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_extra_group_dto_1.UpdateExtraGroupDto, Object]),
    __metadata("design:returntype", void 0)
], AdminExtraController.prototype, "updateGroup", null);
__decorate([
    (0, common_1.Delete)('groups/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Extra Group' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AdminExtraController.prototype, "deleteGroup", null);
__decorate([
    (0, common_1.Post)('groups/:groupId/items'),
    (0, swagger_1.ApiOperation)({ summary: 'Add Extra to Group' }),
    __param(0, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_extra_dto_1.CreateExtraDto, Object]),
    __metadata("design:returntype", void 0)
], AdminExtraController.prototype, "createExtra", null);
__decorate([
    (0, common_1.Patch)('items/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Extra' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_extra_dto_1.UpdateExtraDto, Object]),
    __metadata("design:returntype", void 0)
], AdminExtraController.prototype, "updateExtra", null);
__decorate([
    (0, common_1.Delete)('items/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Extra' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AdminExtraController.prototype, "deleteExtra", null);
__decorate([
    (0, common_1.Post)('products/:productId/groups/:groupId'),
    (0, swagger_1.ApiOperation)({ summary: 'Link Extra Group to Product' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AdminExtraController.prototype, "linkGroupToProduct", null);
__decorate([
    (0, common_1.Delete)('products/:productId/groups/:groupId'),
    (0, swagger_1.ApiOperation)({ summary: 'Unlink Extra Group from Product' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AdminExtraController.prototype, "unlinkGroupFromProduct", null);
exports.AdminExtraController = AdminExtraController = __decorate([
    (0, swagger_1.ApiTags)('Admin Extras'),
    (0, common_1.Controller)('admin/extras'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [extra_service_1.ExtraService])
], AdminExtraController);
//# sourceMappingURL=admin-extra.controller.js.map