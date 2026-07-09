import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async getProfile(customerId: number) {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    // Remove sensitive data
    const {
      passwordHash: _ph,
      hashedRefreshToken: _hrt,
      isDeleted: _id,
      ...safeCustomer
    } = customer;
    return safeCustomer;
  }

  async getAllCustomers() {
    const customers = await this.customerRepository.findAll();
    return customers.map(c => {
      const {
        passwordHash: _ph,
        hashedRefreshToken: _hrt,
        isDeleted: _id,
        ...safeCustomer
      } = c;
      return safeCustomer;
    });
  }

  async updateProfile(customerId: number, updateDto: UpdateProfileDto) {
    const updated = await this.customerRepository.update(customerId, updateDto);
    const {
      passwordHash: _ph,
      hashedRefreshToken: _hrt,
      isDeleted: _id,
      ...safeCustomer
    } = updated;
    return safeCustomer;
  }

  async softDeleteAccount(customerId: number) {
    await this.customerRepository.update(customerId, { isDeleted: true });
    return { message: 'Account deleted successfully' };
  }
}
