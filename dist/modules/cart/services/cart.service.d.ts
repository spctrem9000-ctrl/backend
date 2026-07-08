import { PrismaService } from '../../../core/prisma/prisma.service';
import { AddCartItemDto } from '../dto/cart.dto';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    getCart(customerId: number): Promise<any>;
    addItem(customerId: number, dto: AddCartItemDto): Promise<any>;
    removeItem(customerId: number, cartItemId: number): Promise<any>;
    updateQuantity(customerId: number, cartItemId: number, quantity: number): Promise<any>;
    clearCart(customerId: number): Promise<any>;
    applyCoupon(customerId: number, code: string): Promise<any>;
    removeCoupon(customerId: number): Promise<any>;
    private calculateTotals;
}
