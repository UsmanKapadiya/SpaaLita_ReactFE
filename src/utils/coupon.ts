import type { CartItem } from '../store/cartSlice';

// Shipping amount sent with every coupon check (no dynamic shipping yet)
const COUPON_SHIPPING_AMOUNT = 50;

/** Request body of the /coupon/apply endpoint */
export const buildCouponRequest = (couponCode: string, cartItems: CartItem[]) => ({
    couponCode,
    cartItems: cartItems.map(item => ({
        productId: item.id,
        price: item.price,
        qty: item.qty,
        category: item.category || '',
    })),
    shippingAmount: COUPON_SHIPPING_AMOUNT,
});

/** applyCouponToCart payload from a successful /coupon/apply response */
export const toAppliedCoupon = (data: any, cartTotal: number) => ({
    couponCode: data.couponCode,
    discountAmount: data.discountAmount || 0,
    freeShippingAmount: data.freeShippingAmount || 0,
    totalAfterDiscount: data.totalAfterDiscount || cartTotal,
});
