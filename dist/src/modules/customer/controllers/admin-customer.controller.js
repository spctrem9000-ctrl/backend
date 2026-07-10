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
exports.AdminCustomerController = void 0;
const common_1 = require("@nestjs/common");
const tag_service_1 = require("../services/tag.service");
const note_service_1 = require("../services/note.service");
const customer_service_1 = require("../customer.service");
const client_1 = require("@prisma/client");
const create_tag_dto_1 = require("../dto/create-tag.dto");
const create_note_dto_1 = require("../dto/create-note.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const swagger_1 = require("@nestjs/swagger");
let AdminCustomerController = class AdminCustomerController {
    tagService;
    noteService;
    customerService;
    constructor(tagService, noteService, customerService) {
        this.tagService = tagService;
        this.noteService = noteService;
        this.customerService = customerService;
    }
    getAllCustomers() {
        return this.customerService.getAllCustomers();
    }
    getCustomerDetails(id) {
        return this.customerService.getAdminCustomerDetails(id);
    }
    getCustomerTimeline(id) {
        return this.customerService.getCustomerTimeline(id);
    }
    updateStatus(id, status) {
        return this.customerService.updateCustomerStatus(id, status);
    }
    createTag(dto) {
        return this.tagService.createTag(dto);
    }
    getAllTags() {
        return this.tagService.getAllTags();
    }
    assignTag(customerId, tagId) {
        return this.tagService.assignTagToCustomer(customerId, tagId);
    }
    removeTag(customerId, tagId) {
        return this.tagService.removeTagFromCustomer(customerId, tagId);
    }
    getNotes(customerId) {
        return this.noteService.getNotes(customerId);
    }
    addNote(customerId, dto, user) {
        return this.noteService.createNote(customerId, dto, user.id);
    }
    deleteNote(noteId) {
        return this.noteService.deleteNote(noteId);
    }
};
exports.AdminCustomerController = AdminCustomerController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all customers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminCustomerController.prototype, "getAllCustomers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get full CRM details for a customer' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminCustomerController.prototype, "getCustomerDetails", null);
__decorate([
    (0, common_1.Get)(':id/timeline'),
    (0, swagger_1.ApiOperation)({ summary: 'Get customer activity timeline' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminCustomerController.prototype, "getCustomerTimeline", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update customer status (Verify, Block, etc)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], AdminCustomerController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)('tags'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new customer tag' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tag_dto_1.CreateCustomerTagDto]),
    __metadata("design:returntype", void 0)
], AdminCustomerController.prototype, "createTag", null);
__decorate([
    (0, common_1.Get)('tags'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all system tags' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminCustomerController.prototype, "getAllTags", null);
__decorate([
    (0, common_1.Post)(':customerId/tags/:tagId'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign tag to customer' }),
    __param(0, (0, common_1.Param)('customerId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('tagId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AdminCustomerController.prototype, "assignTag", null);
__decorate([
    (0, common_1.Delete)(':customerId/tags/:tagId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove tag from customer' }),
    __param(0, (0, common_1.Param)('customerId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('tagId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AdminCustomerController.prototype, "removeTag", null);
__decorate([
    (0, common_1.Get)(':customerId/notes'),
    (0, swagger_1.ApiOperation)({ summary: 'Get customer CRM notes' }),
    __param(0, (0, common_1.Param)('customerId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminCustomerController.prototype, "getNotes", null);
__decorate([
    (0, common_1.Post)(':customerId/notes'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a CRM note to a customer' }),
    __param(0, (0, common_1.Param)('customerId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_note_dto_1.CreateCustomerNoteDto, Object]),
    __metadata("design:returntype", void 0)
], AdminCustomerController.prototype, "addNote", null);
__decorate([
    (0, common_1.Delete)('notes/:noteId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a CRM note' }),
    __param(0, (0, common_1.Param)('noteId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminCustomerController.prototype, "deleteNote", null);
exports.AdminCustomerController = AdminCustomerController = __decorate([
    (0, swagger_1.ApiTags)('Admin-Customers'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Controller)('admin/customers'),
    __metadata("design:paramtypes", [tag_service_1.TagService,
        note_service_1.NoteService,
        customer_service_1.CustomerService])
], AdminCustomerController);
//# sourceMappingURL=admin-customer.controller.js.map