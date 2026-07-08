"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModule = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("./customer.service");
const customer_controller_1 = require("./customer.controller");
const customer_repository_1 = require("./customer.repository");
const address_service_1 = require("./services/address.service");
const address_controller_1 = require("./controllers/address.controller");
const favorite_service_1 = require("./services/favorite.service");
const favorite_controller_1 = require("./controllers/favorite.controller");
const tag_service_1 = require("./services/tag.service");
const note_service_1 = require("./services/note.service");
const admin_customer_controller_1 = require("./controllers/admin-customer.controller");
let CustomerModule = class CustomerModule {
};
exports.CustomerModule = CustomerModule;
exports.CustomerModule = CustomerModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            customer_controller_1.CustomerController,
            address_controller_1.AddressController,
            favorite_controller_1.FavoriteController,
            admin_customer_controller_1.AdminCustomerController,
        ],
        providers: [
            customer_service_1.CustomerService,
            customer_repository_1.CustomerRepository,
            address_service_1.AddressService,
            favorite_service_1.FavoriteService,
            tag_service_1.TagService,
            note_service_1.NoteService,
        ],
        exports: [customer_service_1.CustomerService, customer_repository_1.CustomerRepository],
    })
], CustomerModule);
//# sourceMappingURL=customer.module.js.map