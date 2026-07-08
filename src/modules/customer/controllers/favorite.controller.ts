import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { FavoriteService } from '../services/favorite.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('CustomerApp-Favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('customers/me/favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @ApiOperation({ summary: 'Get favorite products' })
  getFavorites(@CurrentUser() user: { id: number }) {
    return this.favoriteService.getFavorites(user.id);
  }

  @Post(':productId')
  @ApiOperation({ summary: 'Toggle product favorite status' })
  toggleFavorite(
    @CurrentUser() user: { id: number },
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.favoriteService.toggleFavorite(user.id, productId);
  }
}
