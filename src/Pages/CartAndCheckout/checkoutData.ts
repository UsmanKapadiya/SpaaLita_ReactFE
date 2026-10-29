import type { ConfirmKlarnaPaymentData } from '@stripe/stripe-js';
import type { CartItem } from '../../store/cartSlice';
import type { PaymentMethod } from '../../utils/payment';
import { sessionStore } from '../../utils/storage';

export interface BillingDetails {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    postcode: string;
    phone: string;
    email: string;
}

export interface ShippingDetails {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    state: string;
    city: string;
    country: string;
    postcode: string;
    giftCard: string;
}

/** What the customer entered at checkout */
export interface CheckoutDetails {
    subtotal: number;
    items: CartItem[];
    shippingAddress: ShippingDetails;
    billingAddress: BillingDetails;
    isUserlogin: boolean;
    createAccount: boolean;
    newsletter: boolean;
}

/** The cart's applied coupon (the payload of applyCouponToCart) */
export interface AppliedCoupon {
    couponCode: string;
    discountAmount: number;
    freeShippingAmount?: number;
    totalAfterDiscount: number;
}

/** An order created at checkout, with the client secret that pays its Stripe PaymentIntent */
export interface PlacedOrder {
    /** The order request: retrying with the same details pays this order again */
    key: string;
    order: any;
    clientSecret: string;
}

const OBJECT_ID = /^[0-9a-f]{24}$/i;

// Orders store addresses as {name, address, zip, email, phone, ...}. The form keys
// (address1, postcode, giftCard) are sent as well: the backend uses them to save the
// addresses on the account it creates for a guest who ticks "Create an account".
const toOrderAddress = (address: Partial<BillingDetails & ShippingDetails>, contact: BillingDetails) => ({
    ...address,
    name: `${address.firstName || ''} ${address.lastName || ''}`.trim(),
    address: [address.address1, address.address2].filter(Boolean).join(', '),
    zip: address.postcode || '',
    email: address.email || contact.email || '',
    phone: address.phone || contact.phone || '',
});

/** Body of POST /orders */
export const buildOrderPayload = (details: CheckoutDetails, paymentMethod: PaymentMethod, coupon?: AppliedCoupon) => {
    const { subtotal, items, shippingAddress, billingAddress, isUserlogin, createAccount, newsletter } = details;

    const payload: any = {
        items: items.map(item => ({
            // links the order line to the product record (only real ids are sent)
            ...(OBJECT_ID.test(item.id) && { productId: item.id }),
            name: item.name,
            price: item.price,
            qty: item.qty,
            image: item.image,
        })),
        // Before discount: the backend subtracts coupon.discountAmount itself
        totalAmount: subtotal,
        shippingAddress: toOrderAddress(shippingAddress, billingAddress),
        billingAddress: toOrderAddress(billingAddress, billingAddress),
        paymentMethod,
    };

    // "Yes, I'm ok with ... newsletter" checkbox: subscribes the customer's email
    if (newsletter) {
        payload.newsletter = true;
    }

    if (coupon) {
        payload.coupon = {
            code: coupon.couponCode,
            discountAmount: coupon.discountAmount,
            freeShippingAmount: 0
        };
    }

    if (!isUserlogin) {
        payload.guestInfo = {
            name: `${billingAddress.firstName} ${billingAddress.lastName}`.trim(),
            email: billingAddress.email,
            phone: billingAddress.phone
        };

        if (createAccount) {
            payload.createAccount = true;
        }
    }

    return payload;
};

const fullName = (address: { firstName: string; lastName: string }) =>
    `${address.firstName || ''} ${address.lastName || ''}`.trim();

const optional = (value?: string) => value?.trim() || undefined;

// Stripe needs ISO country codes; the checkout only sells to Canada (country field "CA")
const countryCode = (country?: string) => (/^[a-z]{2}$/i.test(country?.trim() || '') ? country!.trim().toUpperCase() : 'CA');

const toStripeAddress = (address: BillingDetails | ShippingDetails) => ({
    line1: address.address1?.trim() || '',
    line2: optional(address.address2),
    city: optional(address.city),
    state: optional(address.state),
    postal_code: optional(address.postcode),
    country: countryCode(address.country),
});

/**
 * stripe.confirmKlarnaPayment data: the billing and shipping details pre-fill
 * Klarna's form and help Klarna approve the payment.
 */
export const toKlarnaPaymentData = (billing: BillingDetails, shipping: ShippingDetails, returnUrl: string): ConfirmKlarnaPaymentData => {
    const shippingName = fullName(shipping) || fullName(billing);

    return {
        payment_method: {
            billing_details: {
                name: optional(fullName(billing)),
                email: optional(billing.email),
                phone: optional(billing.phone),
                address: toStripeAddress(billing),
            },
        },
        ...(shippingName && shipping.address1?.trim() && {
            shipping: { name: shippingName, address: toStripeAddress(shipping) },
        }),
        return_url: returnUrl,
    };
};

/** Identifies the cart contents a checkout was made for */
export const cartFingerprint = (items: CartItem[]): string =>
    JSON.stringify(items.map(item => [item.id, item.qty, item.price]));

/**
 * A Klarna checkout waiting for the customer to come back from Klarna.
 * Klarna's redirect reloads the website, so the order and what the customer
 * entered are kept for this browser tab: the confirmation page shows the
 * order, and a cancelled or declined payment brings the customer back to a
 * filled-in checkout that pays the same order.
 */
export interface PendingKlarnaCheckout extends PlacedOrder {
    cart: string;
    billingAddress: BillingDetails;
    shippingAddress: ShippingDetails;
    createAccount: boolean;
    newsletter: boolean;
    coupon?: AppliedCoupon;
}

const PENDING_KLARNA_CHECKOUT = 'spaalita.pendingKlarnaCheckout';

export const pendingKlarnaCheckout = {
    save: (checkout: PendingKlarnaCheckout) => sessionStore.setJSON(PENDING_KLARNA_CHECKOUT, checkout),
    load: () => sessionStore.getJSON<PendingKlarnaCheckout>(PENDING_KLARNA_CHECKOUT),
    clear: () => sessionStore.removeItem(PENDING_KLARNA_CHECKOUT),
};
