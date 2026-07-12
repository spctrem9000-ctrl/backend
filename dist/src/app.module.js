"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const nestjs_pino_1 = require("nestjs-pino");
const throttler_1 = require("@nestjs/throttler");
const env_validation_1 = require("./core/config/env.validation");
const prisma_module_1 = require("./core/prisma/prisma.module");
const health_module_1 = require("./core/health/health.module");
const auth_module_1 = require("./modules/auth/auth.module");
const customer_module_1 = require("./modules/customer/customer.module");
const category_module_1 = require("./modules/category/category.module");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const storage_module_1 = require("./modules/storage/storage.module");
const product_module_1 = require("./modules/product/product.module");
const cart_module_1 = require("./modules/cart/cart.module");
const order_module_1 = require("./modules/order/order.module");
const loyalty_module_1 = require("./modules/loyalty/loyalty.module");
const marketing_module_1 = require("./modules/marketing/marketing.module");
const engagement_module_1 = require("./modules/engagement/engagement.module");
const cms_module_1 = require("./modules/cms/cms.module");
const admin_module_1 = require("./modules/admin/admin.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validate: env_validation_1.validate,
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
                    transport: process.env.NODE_ENV !== 'production'
                        ? { target: 'pino-pretty' }
                        : undefined,
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), 'uploads'),
                serveRoot: '/uploads',
            }),
            prisma_module_1.PrismaModule,
            health_module_1.HealthModule,
            customer_module_1.CustomerModule,
            auth_module_1.AuthModule,
            category_module_1.CategoryModule,
            storage_module_1.StorageModule,
            product_module_1.ProductModule,
            cart_module_1.CartModule,
            order_module_1.OrderModule,
            loyalty_module_1.LoyaltyModule,
            marketing_module_1.MarketingModule,
            engagement_module_1.EngagementModule,
            cms_module_1.CmsModule,
            admin_module_1.AdminModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map