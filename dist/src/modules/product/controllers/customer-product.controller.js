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
exports.CustomerProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("../services/product.service");
const product_filter_dto_1 = require("../dto/product-filter.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let CustomerProductController = class CustomerProductController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    findAll(filters) {
        return this.productService.searchCustomer(filters);
    }
    findOne(id) {
        return this.productService.getCustomerDetails(id);
    }
};
exports.CustomerProductController = CustomerProductController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List and filter active products' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_filter_dto_1.ProductFilterDto]),
    __metadata("design:returntype", void 0)
], CustomerProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get product details (and increment views)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CustomerProductController.prototype, "findOne", null);
exports.CustomerProductController = CustomerProductController = __decorate([
    (0, swagger_1.ApiTags)('CustomerApp-Products'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], CustomerProductController);
//# sourceMappingURL=customer-product.controller.js.map