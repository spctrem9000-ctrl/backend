import { PrismaService } from '../../core/prisma/prisma.service';
import { Prisma, Customer } from '@prisma/client';
export declare class CustomerRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.CustomerCreateInput): Promise<Customer>;
    findAll(): Promise<Customer[]>;
    findByPhone(phone: string): Promise<Customer | null>;
    findById(id: number): Promise<Customer | null>;
    update(id: number, data: Prisma.CustomerUpdateInput): Promise<Customer>;
}
