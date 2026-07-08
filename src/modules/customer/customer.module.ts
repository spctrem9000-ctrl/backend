import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './customer.repository';
import { AddressService } from './services/address.service';
import { AddressController } from './controllers/address.controller';
import { FavoriteService } from './services/favorite.service';
import { FavoriteController } from './controllers/favorite.controller';
import { TagService } from './services/tag.service';
import { NoteService } from './services/note.service';
import { AdminCustomerController } from './controllers/admin-customer.controller';

@Module({
  controllers: [
    CustomerController,
    AddressController,
    FavoriteController,
    AdminCustomerController,
  ],
  providers: [
    CustomerService,
    CustomerRepository,
    AddressService,
    FavoriteService,
    TagService,
    NoteService,
  ],
  exports: [CustomerService, CustomerRepository],
})
export class CustomerModule {}
