import React, { useState } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './MyAccount.css';
import Dashboard from './Dashboard';
import Orders from './Orders';
import Downloads from './Downloads';
import Addresses from './Addresses';
import PaymentMethods from './PaymentMethods';
import AccountDetails from './AccountDetails';
import Submissions from './Submissions';
import LostPassword from './LostPassword';

const MyAccount = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userName] = useState('Spaalita');
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showLostPassword, setShowLostPassword] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
        console.log('Logging out...');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
        navigate('/my-account');
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        console.log('Password reset link sent');
        setShowLostPassword(false);
    };

    const getActiveTab = () => {
        const path = location.pathname;
        if (path === '/my-account' || path === '/my-account/') return 'dashboard';
        if (path.includes('/orders')) return 'orders';
        if (path.includes('/downloads')) return 'downloads';
        if (path.includes('/addresses')) return 'addresses';
        if (path.includes('/payment-methods')) return 'payment-methods';
        if (path.includes('/account-details')) return 'account-details';
        if (path.includes('/submissions')) return 'submissions';
        if (path.includes('/lost-password')) return 'lost-password';
        return 'dashboard';
    };

    const activeTab = getActiveTab();

    
    if (!isLoggedIn) {
        return (
            <div className="my-account-page">
                <div className="container py-5">
                    <div className="woocommerce">
                        <div className="woocommerce-notices-wrapper"></div>

                        <h2>Login</h2>

                        <form className="woocommerce-form woocommerce-form-login login w-50" method="post" onSubmit={handleLogin}>
                            <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                <label htmlFor="username">Username or email address&nbsp;<span className="required">*</span></label>
                                <input type="text" className="woocommerce-Input woocommerce-Input--text input-text form-control" name="username" id="username" autoComplete="username" defaultValue="" />
                                <input type="hidden" name="wfls-email-verification" id="wfls-email-verification" value="" />
                            </p>
                            <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                <label htmlFor="password">Password&nbsp;<span className="required">*</span></label>
                                <span className="password-input" style={{ position: 'relative' }}>
                                    <input className="woocommerce-Input woocommerce-Input--text input-text form-control" type={showPassword ? "text" : "password"} name="password" id="password" autoComplete="current-password" />
                                    <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </span>
                                </span>
                            </p>

                            <p className="form-row">
                                <label className="woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme">
                                    <input className="woocommerce-form__input woocommerce-form__input-checkbox" name="rememberme" type="checkbox" id="rememberme" value="forever" /> <span>Remember me</span>
                                </label>
                                <input type="hidden" id="woocommerce-login-nonce" name="woocommerce-login-nonce" value="fbc26dfa8c" />
                                <input type="hidden" name="_wp_http_referer" value="/my-account/" />
                                <button type="submit" className="woocommerce-Button wc-forward woocommerce-form-login__submit p-2" name="login" value="Log in">Log in</button>
                            </p>
                            <p className="woocommerce-LostPassword lost_password">
                                <span onClick={() => navigate('/my-account/lost-password')} style={{ cursor: 'pointer' }}>Lost your password?</span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="my-account-page">
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-2 mb-4">
                        <nav className="account-navigation" aria-label="Account pages">
                            <ul>
                                <li className={activeTab === 'dashboard' ? 'is-active' : ''}>
                                    <span onClick={() => navigate('/my-account')}>Dashboard</span>
                                </li>
                                <li className={activeTab === 'orders' ? 'is-active' : ''}>
                                    <span onClick={() => navigate('/my-account/orders')}>Orders</span>
                                </li>
                                <li className={activeTab === 'downloads' ? 'is-active' : ''}>
                                    <span onClick={() => navigate('/my-account/downloads')}>Downloads</span>
                                </li>
                                <li className={activeTab === 'addresses' ? 'is-active' : ''}>
                                    <span onClick={() => navigate('/my-account/addresses')}>Addresses</span>
                                </li>
                                <li className={activeTab === 'payment-methods' ? 'is-active' : ''}>
                                    <span onClick={() => navigate('/my-account/payment-methods')}>Payment methods</span>
                                </li>
                                <li className={activeTab === 'account-details' ? 'is-active' : ''}>
                                    <span onClick={() => navigate('/my-account/account-details')}>Account Details</span>
                                </li>
                                <li className={activeTab === 'submissions' ? 'is-active' : ''}>
                                    <span onClick={() => navigate('/my-account/submissions')}>Submissions</span>
                                </li>
                                <li>
                                    <span onClick={handleLogout} className="logout-link">Logout</span>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="col-lg-10 ml-0 pl-0">
                        <div className="account-content">
                            <Routes>
                                <Route path="/" element={<Dashboard userName={userName} />} />
                                <Route path="/orders" element={<Orders />} />
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