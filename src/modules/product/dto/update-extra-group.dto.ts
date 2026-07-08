import { PartialType } from '@nestjs/swagger';
import { CreateExtraGroupDto } from './create-extra-group.dto';

export class UpdateExtraGroupDto extends PartialType(CreateExtraGroupDto) {}
