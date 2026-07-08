import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from '../services/address.service';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('CustomerApp-Addresses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('customers/me/addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Create new address' })
  create(@CurrentUser() user: { id: number }, @Body() dto: CreateAddressDto) {
    return this.addressService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all addresses' })
  findAll(@CurrentUser() user: { id: number }) {
    return this.addressService.findAll(user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update address' })
  update(
    @CurrentUser() user: { id: number },
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.addressService.update(id, user.id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete address' })
  remove(
    @CurrentUser() user: { id: number },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.addressService.remove(id, user.id);
  }

  @Post(':id/default')
  @ApiOperation({ summary: 'Set address as default' })
  setDefault(
    @CurrentUser() user: { id: number },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.addressService.setDefault(id, user.id);
  }
}
