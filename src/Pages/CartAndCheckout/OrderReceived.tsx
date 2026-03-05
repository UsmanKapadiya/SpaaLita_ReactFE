import { useLocation, useNavigate, useParams } from "react-router-dom";
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import './OrderReceived.css'
import { useCallback } from "react";

const OrderReceived = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const location = useLocation();
    const order: any = location.state;

    const calculateTotal = useCallback((): number => {
        return order?.items.reduce((total, item) => total + (item.price * item.qty), 0);
    }, [order]);

    if (!order) {
        return (
            <div className="container py-5 text-center">
                <h3>Order not found</h3>
                <p>Please check your order history.</p>
            </div>
        );
    }

    return (
        <div className="container py-5">

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
                        <p className="mb-0">{order.user?.email}</p>
                    </div>

                    <div className="flex-fill border-end border-dashed d-flex flex-column text-start px-3">
                        <strong>Total</strong>
                        <p className="mb-0">${order.totalAmount}</p>
                    </div>

                    <div className="flex-fill d-flex flex-column text-start px-3">
                        <strong>Payment Method</strong>
                        <p className="mb-0">Credit Card / Debit Card</p>
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
                                        <span>{item.productName}</span>
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
                                            {calculateTotal().toFixed(2)}
                                        </bdi>
                                    </span>
                                </td>
                            </tr>

                            {/* Discount (only show if applied) */}
                            {order.coupon?.discountAmount > 0 && (
                                <tr className="cart-discount">
                                    <th>Discount</th>
                                    <td>
                                        <span className="woocommerce-Price-amount amount">
                                            <bdi>
                                                <span className="woocommerce-Price-currencySymbol"> - </span>
                                                {order.coupon?.discountAmount.toFixed(2)}
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
                                                {(calculateTotal() - order.coupon?.discountAmount).toFixed(2)}
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