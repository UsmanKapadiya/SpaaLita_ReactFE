import type { FC, RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orderPlaced } from '../../Services/UserServices';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCart, removeCoupon } from '../../store/cartSlice';
import type { PaymentMethod } from '../../utils/payment';
import {
    buildOrderPayload,
    cartFingerprint,
    pendingKlarnaCheckout,
    toKlarnaPaymentData,
    type AppliedCoupon,
    type CheckoutDetails,
    type PlacedOrder,
} from './checkoutData';

/** Pays with a payment form; `form` is the checkout form, whose required fields are checked first */
export type SubmitPayment = (form?: HTMLFormElement | null) => void;

export interface PaymentFormProps extends CheckoutDetails {
    /** Receives the form's submit function, so the checkout's "Place order" button pays with it too */
    submitRef: RefObject<SubmitPayment | null>;
}

/** The cart's applied coupon, if any */
const useAppliedCoupon = (): AppliedCoupon | undefined => {
    const { appliedCoupon, discountAmount = 0, freeShippingAmount = 0, totalAfterDiscount = 0 } = useAppSelector(state => state.cart);

    return appliedCoupon ? { couponCode: appliedCoupon, discountAmount, freeShippingAmount, totalAfterDiscount } : undefined;
};

/**
 * Creates the order and its Stripe PaymentIntent. An order whose payment failed
 * is paid again when the customer retries with the same details, instead of
 * creating a duplicate.
 */
const useOrderPlacement = (
    details: CheckoutDetails,
    paymentMethod: PaymentMethod,
    initialOrder: PlacedOrder | null | (() => PlacedOrder | null) = null,
) => {
    const coupon = useAppliedCoupon();
    const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(initialOrder);

    const placeOrder = async (): Promise<PlacedOrder> => {
        const payload = buildOrderPayload(details, paymentMethod, coupon);
        const key = JSON.stringify(payload);

        if (placedOrder?.key === key) {
            return placedOrder;
        }

        const orderResponse = await orderPlaced(payload);

        if (!orderResponse?.success || !orderResponse.clientSecret) {
            throw new Error(orderResponse?.message || "Order creation failed");
        }

        const current = { key, order: orderResponse.data, clientSecret: orderResponse.clientSecret };
        setPlacedOrder(current);

        return current;
    };

    return { placeOrder, coupon, forgetOrder: () => setPlacedOrder(null) };
};

/**
 * Runs a payment: checks the checkout form, blocks double submission and shows
 * the error of a failed attempt. `pay` resolves to true when the browser is
 * leaving for a payment page (the form then stays disabled).
 */
const usePaymentSubmit = (pay: () => Promise<boolean | void>, submitRef: RefObject<SubmitPayment | null>) => {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inFlight = useRef(false);

    const submit: SubmitPayment = async (form) => {
        if (inFlight.current) return;

        // The payment buttons do not submit the checkout form, so run its required-field checks here
        if (form && !form.reportValidity()) return;

        inFlight.current = true;
        setProcessing(true);
        setError(null);
        let leaving = false;

        try {
            leaving = (await pay()) === true;
        } catch (err: any) {
            setError(err.message);
            toast.error(err.message || "Failed to place order");
        } finally {
            if (!leaving) {
                inFlight.current = false;
                setProcessing(false);
            }
        }
    };

    useEffect(() => {
        submitRef.current = submit;

        return () => {
            if (submitRef.current === submit) submitRef.current = null;
        };
    });

    // Coming back from a payment page with the browser's Back button can restore
    // this page as it was left (still processing): enable the form again
    useEffect(() => {
        const onPageShow = (event: PageTransitionEvent) => {
            if (event.persisted) {
                inFlight.current = false;
                setProcessing(false);
            }
        };

        window.addEventListener('pageshow', onPageShow);

        return () => window.removeEventListener('pageshow', onPageShow);
    }, []);

    return { submit, processing, error };
};

export const CardPaymentForm: FC<PaymentFormProps> = ({ submitRef, ...details }) => {
    const dispatch = useAppDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { placeOrder, forgetOrder } = useOrderPlacement(details, 'card');

    const [cardComplete, setCardComplete] = useState(false);
    const [cardError, setCardError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const pay = async () => {
        if (!stripe || !elements || success) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        // Checked before the order is created, so an unfinished card leaves no unpaid order behind
        if (!cardComplete) {
            throw new Error(cardError || "Please enter your card details.");
        }

        const { billingAddress } = details;
        const current = await placeOrder();

        // Charge the card with the PaymentIntent the backend created for this order
        const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(current.clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: `${billingAddress.firstName} ${billingAddress.lastName}`.trim(),
                    email: billingAddress.email,
                    phone: billingAddress.phone,
                },
            },
        });

        if (paymentError) {
            throw new Error(paymentError.message || "Payment failed");
        }

        if (paymentIntent?.status !== 'succeeded') {
            throw new Error(`Payment ${paymentIntent?.status || 'failed'}`);
        }

        toast.success("Order placed successfully 🎉");
        setSuccess(true);
        forgetOrder();
        // An unpaid Klarna attempt from this tab is no longer needed
        pendingKlarnaCheckout.clear();

        dispatch(clearCart());
        dispatch(removeCoupon());

        navigate(`/checkout/order-received/${current.order._id}`, {
            state: current.order
        });
    };

    const { submit, processing, error } = usePaymentSubmit(pay, submitRef);

    return (
        <div style={{ marginTop: 16 }}>
            <CardElement
                options={{ hidePostalCode: true }}
                onChange={(event) => {
                    setCardComplete(event.complete);
                    setCardError(event.error?.message ?? null);
                }}
            />
            <button
                type="button"
                disabled={!stripe || processing || success}
                className="button alt shopButton"
                style={{ marginTop: 16 }}
                onClick={(e) => submit(e.currentTarget.form)}
            >
                {processing ? 'Processing...' : success ? 'Payment Successful' : 'Pay Now'}
            </button>
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
            {success && <div style={{ color: 'green', marginTop: 8 }}>Payment successful!</div>}
        </div>
    );
};

/**
 * Klarna (through Stripe): creates the order, then redirects the customer to
 * Klarna, which sends them back to /checkout/order-received/:orderId.
 */
export const KlarnaPaymentForm: FC<PaymentFormProps> = ({ submitRef, ...details }) => {
    const stripe = useStripe();
    // A Klarna attempt from this tab that was not paid: retrying with the same details pays that order
    const { placeOrder, coupon } = useOrderPlacement(details, 'klarna', pendingKlarnaCheckout.load);

    const pay = async (): Promise<boolean> => {
        if (!stripe) return false;

        const { billingAddress, shippingAddress } = details;
        const current = await placeOrder();

        // Klarna's redirect reloads the website: keep the order and the checkout for this tab
        pendingKlarnaCheckout.save({
            ...current,
            cart: cartFingerprint(details.items),
            billingAddress,
            shippingAddress,
            createAccount: details.createAccount,
            newsletter: details.newsletter,
            coupon,
        });

        const returnUrl = `${window.location.origin}/checkout/order-received/${encodeURIComponent(current.order._id)}`;

        // Redirects to Klarna; an error means the customer is still on this page
        const { error } = await stripe.confirmKlarnaPayment(
            current.clientSecret,
            toKlarnaPaymentData(billingAddress, shippingAddress, returnUrl),
        );

        if (error) {
            throw new Error(error.message || "Klarna payment failed");
        }

        return true;
    };

    const { submit, processing, error } = usePaymentSubmit(pay, submitRef);

    return (
        <div style={{ marginTop: 16 }}>
            <button
                type="button"
                disabled={!stripe || processing}
                className="button alt shopButton"
                onClick={(e) => submit(e.currentTarget.form)}
            >
                {processing ? 'Redirecting to Klarna...' : 'Pay with Klarna'}
            </button>
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        </div>
    );
};
