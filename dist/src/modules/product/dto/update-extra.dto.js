"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExtraDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_extra_dto_1 = require("./create-extra.dto");
class UpdateExtraDto extends (0, swagger_1.PartialType)(create_extra_dto_1.CreateExtraDto) {
}
exports.UpdateExtraDto = UpdateExtraDto;
//# sourceMappingURL=update-extra.dto.js.map