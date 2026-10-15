import type { FC } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import './MyAccount.css';
import Dashboard from './Dashboard';
import Orders from './Orders';
import OrderDetails from './OrderDetails';
import Downloads from './Downloads';
import Addresses from './Addresses';
import PaymentMethods from './PaymentMethods';
import AccountDetails from './AccountDetails';
import Submissions from './Submissions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/authSlice';

// Sidebar entries; `path` is relative to /my-account
const ACCOUNT_TABS = [
    { label: 'Dashboard', path: '' },
    { label: 'Orders', path: '/orders' },
    { label: 'Downloads', path: '/downloads' },
    { label: 'Addresses', path: '/addresses' },
    { label: 'Payment methods', path: '/payment-methods' },
    { label: 'Account Details', path: '/account-details' },
    { label: 'Submissions', path: '/submissions' },
];

const getActiveTab = (pathname: string): string | null => {
    const path = pathname.replace(/^\/my-account/, '').replace(/\/$/, '');
    if (path.startsWith('/orders/')) return null; // order details: no tab highlighted
    return ACCOUNT_TABS.find(tab => tab.path === path)?.path ?? '';
};

const MyAccount: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const user = useAppSelector((state) => state.auth.user);
    const activeTab = getActiveTab(location.pathname);

    return (
        <div className="my-account-page">
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-2 mb-4">
                        <nav className="account-navigation" aria-label="Account pages">
                            <ul>
                                {ACCOUNT_TABS.map(tab => (
                                    <li key={tab.label} className={activeTab === tab.path ? 'is-active' : ''}>
                                        <span onClick={() => navigate(`/my-account${tab.path}`)}>{tab.label}</span>
                                    </li>
                                ))}
                                <li>
                                    {/* ProtectedRoute sends the logged-out user to the home page */}
                                    <span onClick={() => dispatch(logout())} className="logout-link">Logout</span>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="col-lg-10 ml-0 pl-0">
                        <div className="account-content">
                            <Routes>
                                <Route path="/" element={<Dashboard userName={user?.userName} />} />
                                <Route path="/orders" element={<Orders />} />
                                <Route path="/orders/:id" element={<OrderDetails />} />
                                <Route path="/downloads" element={<Downloads />} />
                                <Route path="/addresses" element={<Addresses />} />
                                <Route path="/payment-methods" element={<PaymentMethods />} />
                                <Route path="/account-details" element={<AccountDetails />} />
                                <Route path="/submissions" element={<Submissions />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
