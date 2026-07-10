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
exports.AddressController = void 0;
const common_1 = require("@nestjs/common");
const address_service_1 = require("../services/address.service");
const create_address_dto_1 = require("../dto/create-address.dto");
const update_address_dto_1 = require("../dto/update-address.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const swagger_1 = require("@nestjs/swagger");
let AddressController = class AddressController {
    addressService;
    constructor(addressService) {
        this.addressService = addressService;
    }
    create(user, dto) {
        return this.addressService.create(user.id, dto);
    }
    findAll(user) {
        return this.addressService.findAll(user.id);
    }
    update(user, id, dto) {
        return this.addressService.update(id, user.id, dto);
    }
    remove(user, id) {
        return this.addressService.remove(id, user.id);
    }
    setDefault(user, id) {
        return this.addressService.setDefault(id, user.id);
    }
};
exports.AddressController = AddressController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new address' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_address_dto_1.CreateAddressDto]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all addresses' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update address' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_address_dto_1.UpdateAddressDto]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete address' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/default'),
    (0, swagger_1.ApiOperation)({ summary: 'Set address as default' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "setDefault", null);
exports.AddressController = AddressController = __decorate([
    (0, swagger_1.ApiTags)('CustomerApp-Addresses'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('customers/me/addresses'),
    __metadata("design:paramtypes", [address_service_1.AddressService])
], AddressController);
//# sourceMappingURL=address.controller.js.map