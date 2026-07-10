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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAddressDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateAddressDto {
    title;
    street;
    building;
    floor;
    apartment;
    landmark;
    latitude;
    longitude;
    isDefault;
}
exports.CreateAddressDto = CreateAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Home' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Main Street 123' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Building A' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "building", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Floor 2' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "floor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Apt 4' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "apartment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Next to the park' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "landmark", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 40.7128 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAddressDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: -74.006 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAddressDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAddressDto.prototype, "isDefault", void 0);
//# sourceMappingURL=create-address.dto.js.map