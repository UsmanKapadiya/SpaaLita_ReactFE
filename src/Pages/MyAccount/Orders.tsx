import { useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserOrder } from '../../Services/UserServices';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import Pagination from '../../Component/Pagination/Pagination';

const Orders: FC = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<Number>(1);
    const itemPerPage = 10;
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 9,
        totalPages: 1
    });

    const fetchOrders = async (page: Number, itemPerPage: Number) => {
        try {
            setLoading(true);
            const response = await getUserOrder(page, itemPerPage);
            setOrders(response?.data);
            setPagination(response.pagination);
        } catch (err: any) {
            setError(err.message || "Failed to load orders");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchOrders(page, itemPerPage);
    }, []);

    useEffect(() => {
        fetchOrders(page, itemPerPage);
    }, [page, itemPerPage,]);

    return (
        <div className="account-orders">
            {orders?.length > 0 ? (
                <div className="orders-table">
                    <table className="woocommerce-orders-table woocommerce-MyAccount-orders shop_table shop_table_responsive my_account_orders account-orders-table">
                        <thead>
                            <tr>
                                <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-number">
                                    <span className="nobr">Order</span>
                                </th>
                                <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-date">
                                    <span className="nobr">Date</span>
                                </th>
                                <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-status">
                                    <span className="nobr">Status</span>
                                </th>
                                <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-total">
                                    <span className="nobr">Total</span>
                                </th>
                                <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-actions">
                                    <span className="nobr">Actions</span>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className={`woocommerce-orders-table__row woocommerce-orders-table__row--status-${order.status} order`}
                                >
                                    {/* Order Number */}
                                    <th
                                        className="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-number"
                                        scope="row"
                                    >
                                        <a
                                            onClick={() => navigate(`/orders/${order._id}`)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            #{order._id.slice(-6)} {/* Short order number */}
                                        </a>
                                    </th>

                                    {/* Date */}
                                    <td className="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-date">
                                        <time dateTime={order.createdAt}>
                                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </time>
                                    </td>

                                    {/* Status */}
                                    <td className="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-status">
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </td>

                                    {/* Total */}
                                    <td className="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-total">
                                        <span className="woocommerce-Price-amount amount">
                                            <span className="woocommerce-Price-currencySymbol">$</span>
                                            {order.totalAmount?.toFixed(2)}
                                        </span>{" "}
                                        for {order.items?.length} item
                                        {order.items?.length > 1 ? "s" : ""}
                                    </td>

                                    {/* Actions */}
                                    <td className="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-actions">
                                        <button
                                            className="woocommerce-button button view"
                                            onClick={() =>
                                                navigate(`/my-account/orders/${order._id}`, { state: { order } })                                               
                                            }
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ clear: "both" }}></div>

                    {pagination.totalPages > 1 && (
                        <Pagination
                            currentPage={pagination.page}
                            totalPages={pagination.totalPages}
                            onPageChange={(newPage) => setPage(newPage)}
                        />
                    )}
                </div>
            ) : (
                <div className="woocommerce-info" role="status">
                    <span>
                        <WebAssetIcon className='icon-color mr-2' />
                    </span>
                    No order has been made yet.
                    <button className="woocommerce-Button wc-forward button" onClick={() => navigate('/shop')}>Browse products</button>
                </div>
            )}
        </div>
    );
};

export default Orders;
