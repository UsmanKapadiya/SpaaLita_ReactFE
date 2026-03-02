import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderDetails: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const order = location.state?.order;

    if (!order) {
        return (
            <div>
                <p>No order data found.</p>
                <button onClick={() => navigate("/orders")}>Back to Orders</button>
            </div>
        );
    }

    return (
        <div className="order-details">
            <h2>Order #{order._id}</h2>
            <p>Status: {order.status}</p>
            <p>Total: ${order.totalAmount?.toFixed(2)} for {order.items.length} item{order.items.length > 1 ? "s" : ""}</p>

            <div className="order-addresses-row" style={{ display: 'flex', gap: '2rem' }}>
                {/* Shipping Address */}
                <div className="shipping-address" style={{ flex: 1 }}>
                    <h3>Shipping Address</h3>
                    <p>
                        {order.shippingAddress.name}<br />
                        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                        {order.shippingAddress.country}<br />
                        {order.shippingAddress.phone} | {order.shippingAddress.email}
                    </p>
                </div>

                {/* Billing Address */}
                <div className="billing-address" style={{ flex: 1 }}>
                    <h3>Billing Address</h3>
                    <p>
                        {order.billingAddress.name}<br />
                        {order.billingAddress.address}, {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}<br />
                        {order.billingAddress.country}<br />
                        {order.billingAddress.phone} | {order.billingAddress.email}
                    </p>
                </div>
            </div>

            <h3>Items</h3>
            <div className="orders-table">
                <table className="woocommerce-orders-table woocommerce-MyAccount-orders shop_table shop_table_responsive my_account_orders account-orders-table">
                    <thead>
                        <tr>
                            <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-number">
                                <span className="nobr">Product</span>
                            </th>
                            <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-date">
                                <span className="nobr">Price</span>
                            </th>
                            <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-status">
                                <span className="nobr">Qty</span>
                            </th>
                            <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-total">
                                <span className="nobr">Total</span>
                            </th>
                        </tr>
                    </thead>
                        <tbody>
                        {order.items.map((item: any) => (
                            <tr key={item._id}>
                                <td>{item.productName || item.name}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>{item.qty}</td>
                                <td>${(item.price * item.qty).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>

                {/* <button onClick={() => navigate("/orders")}>Back to Orders</button> */}
            </div>
            );
};

            export default OrderDetails;