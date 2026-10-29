import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LoadingSpinner from '../../Component/LoadingSpinner/LoadingSpinner';
import { useAppDispatch } from '../../store/hooks';
import { clearCart, removeCoupon } from '../../store/cartSlice';
import { paymentMethodLabel, stripePromise } from '../../utils/payment';
import { pendingKlarnaCheckout } from './checkoutData';

import './OrderReceived.css'

// PaymentIntent statuses of a payment that went through (or is being processed)
const PAID_STATUSES = ['succeeded', 'processing', 'requires_capture'];

// Messages for Klarna's failure codes (PaymentIntent last_payment_error.code)
const KLARNA_FAILURES: Record<string, string> = {
    payment_method_customer_decline: 'The Klarna payment was cancelled.',
    payment_method_provider_decline: 'Klarna declined the payment. Please choose another payment method.',
    payment_intent_payment_attempt_expired: 'The Klarna session expired before the payment was completed.',
};

const KLARNA_NOT_COMPLETED = 'Your Klarna payment was not completed. Please try again or choose another payment method.';

/**
 * Klarna sends the customer back to this page with ?payment_intent_client_secret=...
 * The payment is checked with Stripe: when it went through, the cart is emptied
 * and the order shown; otherwise the customer goes back to the (filled-in)
 * checkout to try again.
 */
const useKlarnaReturn = (orderId?: string) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const clientSecret = new URLSearchParams(location.search).get('payment_intent_client_secret');
    // Paid, but this tab does not have the order's details
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        if (!clientSecret || location.state) return;

        let cancelled = false;

        const verify = async () => {
            let status: string | undefined;
            let failureCode: string | undefined;

            try {
                const stripe = await stripePromise;
                const result = await stripe?.retrievePaymentIntent(clientSecret);
                status = result?.paymentIntent?.status;
                failureCode = result?.paymentIntent?.last_payment_error?.code;
            } catch (error) {
                console.error('Could not check the Klarna payment', error);
            }

            if (cancelled) return;

            if (status && PAID_STATUSES.includes(status)) {
                const pending = pendingKlarnaCheckout.load();

                pendingKlarnaCheckout.clear();
                dispatch(clearCart());
                dispatch(removeCoupon());
                toast.success("Order placed successfully 🎉");

                // Shows the order, and removes the payment details from the address bar
                if (pending && orderId && pending.order?._id === orderId) {
                    navigate(location.pathname, { replace: true, state: pending.order });
                } else {
                    setConfirmed(true);
                    navigate(location.pathname, { replace: true });
                }

                return;
            }

            toast.error(status
                ? (failureCode && KLARNA_FAILURES[failureCode]) || KLARNA_NOT_COMPLETED
                : 'We could not confirm your Klarna payment. If you completed it, please contact us before paying again.');
            navigate('/checkout', { replace: true });
        };

        verify();

        return () => {
            cancelled = true;
        };
    }, [clientSecret, location.state, location.pathname, orderId, dispatch, navigate]);

    return { checking: Boolean(clientSecret) && !location.state && !confirmed, confirmed };
};

const ReceivedNotice: FC = () => {
    const navigate = useNavigate();

    return (
        <div
            className="text-center mb-3 p-3 rounded"
            style={{ backgroundColor: "#e6f9f0" }}
        >
            <h6
                className="text-success success-order"
            >
                Thank you. Your order has been received.
                <span className="shopping-text"
                    onClick={() => navigate("/shop")}
                >
                    Continue Shopping
                </span>
            </h6>
        </div>
    );
};

const OrderReceived = () => {
    const { orderId } = useParams();
    const location = useLocation();
    const order: any = location.state;
    const klarnaReturn = useKlarnaReturn(orderId);

    if (!order) {
        if (klarnaReturn.checking) {
            return <LoadingSpinner message="Confirming your Klarna payment..." />;
        }

        if (klarnaReturn.confirmed) {
            return (
                <div className="container py-5">
                    <ReceivedNotice />
                    <p className="text-center">Order ID: {orderId}</p>
                </div>
            );
        }

        return (
            <div className="container py-5 text-center">
                <h3>Order not found</h3>
                <p>Please check your order history.</p>
            </div>
        );
    }

    const subtotal: number = order.items.reduce((total: number, item: any) => total + (item.price * item.qty), 0);
    const discountAmount: number = order.coupon?.discountAmount || 0;

    return (
        <div className="container py-5">

            <ReceivedNotice />

            {/* Order Summary */}
            <div className="p-2 mb-4" style={{ overflowX: "auto" }}>
                <div className="d-flex" style={{ minWidth: "900px" }}>

                    <div className="flex-fill border-end border-dashed d-flex flex-column text-start px-3">
                        <strong>Order ID</strong>
                        <p className="mb-0">{orderId}</p>
                    </div>

                    <div className="flex-fill border-end border-dashed d-flex flex-column text-start px-3">
                        <strong>Date</strong>
                        <p className="mb-0">
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>

                    <div className="flex-fill border-end border-dashed d-flex flex-column text-start px-3">
                        <strong>Email</strong>
                        <p className="mb-0">{order?.user ? order.user?.email : order.guestInfo?.email}</p>
                    </div>

                    <div className="flex-fill border-end border-dashed d-flex flex-column text-start px-3">
                        <strong>Total</strong>
                        <p className="mb-0">${order.totalAmount}</p>
                    </div>

                    <div className="flex-fill d-flex flex-column text-start px-3">
                        <strong>Payment Method</strong>
                        <p className="mb-0">{paymentMethodLabel(order.paymentMethod)}</p>
                    </div>

                </div>
            </div>

            {/* Products */}
            <div className="mb-4">
                <h4 className="mb-3">Order details</h4>

                <div className="table-responsive">
                    <table className="table tableBorder w-100">
                        <thead>
                            <tr className="border-bottom">
                                <th className="text-start">Product</th>
                                <th className="text-end">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item: any) => (
                                <tr key={item._id} className="align-middle border-bottom">
                                    <td className="d-flex align-items-center gap-2">
                                        <span>{item.name}</span>
                                        <span className="text-muted ml-1 mr-1">×</span>
                                        <span>{item.qty ?? 1}</span>
                                    </td>
                                    <td className="text-end">
                                        ${(item.price * (item.qty ?? 1)).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            {/* Subtotal */}
                            <tr className="cart-subtotal">
                                <th>Subtotal</th>
                                <td>
                                    <span className="woocommerce-Price-amount amount">
                                        <bdi>
                                            <span className="woocommerce-Price-currencySymbol">$</span>
                                            {subtotal.toFixed(2)}
                                        </bdi>
                                    </span>
                                </td>
                            </tr>

                            {/* Discount (only show if applied) */}
                            {discountAmount > 0 && (
                                <tr className="cart-discount">
                                    <th>Discount</th>
                                    <td>
                                        <span className="woocommerce-Price-amount amount">
                                            <bdi>
                                                <span className="woocommerce-Price-currencySymbol"> - </span>
                                                {discountAmount.toFixed(2)}
                                            </bdi>
                                        </span>
                                    </td>
                                </tr>
                            )}

                            {/* Total after discount */}
                            <tr className="order-total">
                                <th>Total</th>
                                <td>
                                    <strong>
                                        <span className="woocommerce-Price-amount amount">
                                            <bdi>
                                                <span className="woocommerce-Price-currencySymbol">$</span>
                                                {(subtotal - discountAmount).toFixed(2)}
                                            </bdi>
                                        </span>
                                    </strong>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Shipping Address and Billing Address */}
            <div className="d-flex mb-4 justify-content-between flex-wrap">

                {/* Billing Address */}
                <div className="card p-4 flex-fill me-2" style={{ minWidth: "300px", maxWidth: "48%" }}>
                    <h4 className="mb-3">Billing Address</h4>

                    <p>{order.billingAddress.firstName} {order.billingAddress.lastName}</p>
                    <p>{order.billingAddress.city}, {order.billingAddress.state}</p>
                    <p>{order.billingAddress.country}</p>
                    <p className="d-flex align-items-center gap-2">
                        <PhoneEnabledOutlinedIcon />{" "}
                        <span>{order.billingAddress.phone}</span>
                    </p>

                    <p className="d-flex align-items-center gap-3">
                        <EmailOutlinedIcon />{" "}
                        <span> {order.billingAddress.email}</span>
                    </p>
                </div>

                {/* Shipping Address */}
                <div className="card p-4 flex-fill ms-2" style={{ minWidth: "300px", maxWidth: "48%" }}>
                    <h4 className="mb-3">Shipping Address</h4>

                    <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                    <p>{order.shippingAddress.country}</p>
                </div>

            </div>

            {/* Order extra */}
            <div className="mb-4">
                <h4 className="mb-3">Order Extra</h4>

                <div className="table-responsive">
                    <table className="table tableBorder w-100">
                        <thead>
                            <tr className="border-bottom">
                                <th className="text-start">Phone</th>
                                <th className="text-end">{order?.billingAddress?.phone}</th>
                            </tr>
                            <tr className="border-bottom">
                                <th className="text-start">Electronic GiftCard</th>
                                <th className="text-end"></th>
                            </tr>
                        </thead>
                        <tbody>                        
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default OrderReceived;