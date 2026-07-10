import { CartService } from '../services/cart.service';
import { AddCartItemDto, UpdateCartItemQuantityDto, ApplyCouponDto } from '../dto/cart.dto';
export declare class CustomerCartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(user: {
        id: number;
    }): Promise<any>;
    addItem(user: {
        id: number;
    }, dto: AddCartItemDto): Promise<any>;
    updateQuantity(user: {
        id: number;
    }, itemId: number, dto: UpdateCartItemQuantityDto): Promise<any>;
    removeItem(user: {
        id: number;
    }, itemId: number): Promise<any>;
    clearCart(user: {
        id: number;
    }): Promise<any>;
    applyCoupon(user: {
        id: number;
    }, dto: ApplyCouponDto): Promise<any>;
    removeCoupon(user: {
        id: number;
    }): Promise<any>;
}
