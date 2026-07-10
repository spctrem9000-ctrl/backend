"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("./product.repository");
const product_history_service_1 = require("./services/product-history.service");
const product_insight_service_1 = require("./services/product-insight.service");
const product_service_1 = require("./services/product.service");
const admin_product_controller_1 = require("./controllers/admin-product.controller");
const customer_product_controller_1 = require("./controllers/customer-product.controller");
const admin_extra_controller_1 = require("./controllers/admin-extra.controller");
const admin_gallery_controller_1 = require("./controllers/admin-gallery.controller");
const extra_service_1 = require("./services/extra.service");
const storage_module_1 = require("../storage/storage.module");
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [storage_module_1.StorageModule],
        controllers: [
            admin_product_controller_1.AdminProductController,
            customer_product_controller_1.CustomerProductController,
            admin_extra_controller_1.AdminExtraController,
            admin_gallery_controller_1.AdminGalleryController,
        ],
        providers: [
            product_repository_1.ProductRepository,
            product_history_service_1.ProductHistoryService,
            product_insight_service_1.ProductInsightService,
            product_service_1.ProductService,
            extra_service_1.ExtraService,
        ],
        exports: [product_service_1.ProductService, product_insight_service_1.ProductInsightService],
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map