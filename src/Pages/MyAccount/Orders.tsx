import React from 'react';
import { useNavigate } from 'react-router-dom';
import WebAssetIcon from '@mui/icons-material/WebAsset';

const Orders = () => {
    const navigate = useNavigate();

    // Mock data for orders - empty by default to show "no orders" message
    const orders = [
        // { id: '#12345', date: 'February 1, 2026', status: 'Completed', total: '$150.00', items: 3 },
        // { id: '#12344', date: 'January 25, 2026', status: 'Processing', total: '$89.99', items: 2 },
        // { id: '#12343', date: 'January 15, 2026', status: 'Completed', total: '$220.00', items: 5 },
    ];

    return (
        <div className="account-orders">
            {orders.length > 0 ? (
                <div className="orders-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.date}</td>
                                    <td><span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                                    <td>{order.total}</td>
                                    <td><button className="btn-view">View</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
