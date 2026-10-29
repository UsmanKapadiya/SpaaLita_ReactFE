import { loadStripe } from '@stripe/stripe-js';

/**
 * How the customer pays. Sent to the backend as `paymentMethod` (POST /orders)
 * and returned on the order. Both are processed by Stripe: Klarna redirects the
 * customer to Klarna and back to /checkout/order-received/:orderId.
 */
export type PaymentMethod = 'card' | 'klarna';

// Must belong to the same Stripe account as STRIPE_SECRET_KEY in the backend .env
export const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    'pk_test_51P3EWFSBmT8I69xuNp894I2VxHMSiezZJDzTmNLkoUB6mwEAUho9V1bRLo6hnwudpY98J5fQjRwxvqfL3OjVxElr00Kb3IzDhr'
);

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
    card: 'Credit Card / Debit Card',
    klarna: 'Klarna',
};

/** Display name of an order's payment method (orders placed before Klarna have none: card) */
export const paymentMethodLabel = (method?: string | null): string =>
    method && Object.hasOwn(PAYMENT_METHOD_LABELS, method)
        ? PAYMENT_METHOD_LABELS[method as PaymentMethod]
        : PAYMENT_METHOD_LABELS.card;
