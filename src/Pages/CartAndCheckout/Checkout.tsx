import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import './Cart.css';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface BillingDetails {
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

interface ShippingDetails {
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

const Checkout = () => {
    const navigate = useNavigate();

    const [showLogin, setShowLogin] = useState(false);
    const [showCoupon, setShowCoupon] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [createAccount, setCreateAccount] = useState(false);
    const [copyBillingToShipping, setCopyBillingToShipping] = useState(false);
    const [newsletter, setNewsletter] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('stripe');
    const [rememberMe, setRememberMe] = useState(false);

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const [billingDetails, setBillingDetails] = useState<BillingDetails>({
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        country: 'CA',
        state: '',
        city: '',
        postcode: '',
        phone: '',
        email: ''
    });

    const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        state: '',
        city: '',
        country: 'CA',
        postcode: '',
        giftCard: ''
    });

    const [cartItems] = useState<CartItem[]>([
        { id: '1', name: 'Active Pureness Corrector', price: 47.00, quantity: 1 },
        { id: '2', name: 'Gift Card - $100.00', price: 100.00, quantity: 1 },
        { id: '3', name: 'Amazing Base Loose Mineral Foundation', price: 60.00, quantity: 1 }
    ]);

    const canadianProvinces = [
        { value: '', label: 'Select an option…' },
        { value: 'AB', label: 'Alberta' },
        { value: 'BC', label: 'British Columbia' },
        { value: 'MB', label: 'Manitoba' },
        { value: 'NB', label: 'New Brunswick' },
        { value: 'NL', label: 'Newfoundland and Labrador' },
        { value: 'NT', label: 'Northwest Territories' },
        { value: 'NS', label: 'Nova Scotia' },
        { value: 'NU', label: 'Nunavut' },
        { value: 'ON', label: 'Ontario' },
        { value: 'PE', label: 'Prince Edward Island' },
        { value: 'QC', label: 'Quebec' },
        { value: 'SK', label: 'Saskatchewan' },
        { value: 'YT', label: 'Yukon Territory' }
    ];

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleBillingChange = (field: keyof BillingDetails, value: string) => {
        setBillingDetails(prev => ({ ...prev, [field]: value }));
    };

    const handleShippingChange = (field: keyof ShippingDetails, value: string) => {
        setShippingDetails(prev => ({ ...prev, [field]: value }));
    };

    const handleCopyBillingToShipping = (checked: boolean) => {
        setCopyBillingToShipping(checked);
        if (checked) {
            setShippingDetails({
                firstName: billingDetails.firstName,
                lastName: billingDetails.lastName,
                address1: billingDetails.address1,
                address2: billingDetails.address2,
                state: billingDetails.state,
                city: billingDetails.city,
                country: billingDetails.country,
                postcode: billingDetails.postcode,
                giftCard: ''
            });
        }
    };

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle order placement logic here
        console.log('Order placed', { billingDetails, shippingDetails, paymentMethod });
        alert('Order placed successfully!');
    };

    const handleApplyCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Applying coupon:', couponCode);
        alert('Coupon applied!');
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login:', loginData);
        alert('Logged in successfully!');
    };

    return (
        <div className="container">
            <div className="woocommerce">
                <div className="woocommerce-notices-wrapper"></div>

                {/* Login Toggle */}
                <div className="woocommerce-form-login-toggle">
                    {/* Login Toggle */}
                    <div className="woocommerce-form-login-toggle">
                        <div className="woocommerce-info cart-empty" role="status">
                             <span>
                                <WebAssetIcon className='icon-color'/>
                            </span>
                            Returning customer?
                            <button
                                type="button"
                                className="showlogin"
                                onClick={() => setShowLogin(!showLogin)}
                                style={{ background: 'none', border: 'none', color: 'inherit', textDecoration: 'underline', cursor: 'pointer', padding: '0 5px' }}
                            >
                                Click here to login
                            </button>
                        </div>
                    </div>

                    {/* Login Form */}
                    {showLogin && (
                        <form className="woocommerce-form woocommerce-form-login login" onSubmit={handleLogin}>
                            <div className="w-75">
                                <p>If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing section.</p>

                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="form-row">
                                            <label htmlFor="username">Username or email&nbsp;<span className="required">*</span></label>
                                            <input
                                                type="text"
                                                className="input-text form-control checkoutInput loginInput"
                                                name="username"
                                                id="username"
                                                value={loginData.username}
                                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                                autoComplete="username"
                                                required
                                            />
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="form-row">
                                            <label htmlFor="password">Password&nbsp;<span className="required">*</span></label>
                                            <input
                                                className="input-text form-control loginInput"
                                                type="password"
                                                name="password"
                                                id="password"
                                                value={loginData.password}
                                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                                autoComplete="current-password"
                                                required
                                            />
                                        </p>
                                    </div>
                                </div>

                                <p className="form-row">
                                    <label className="woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme">
                                        <input
                                            className="woocommerce-form__input woocommerce-form__input-checkbox"
                                            name="rememberme"
                                            type="checkbox"
                                            id="rememberme"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        <span className='ml-1'>Remember me</span>
                                    </label>
                                    <button type="submit" className="woocommerce-button button woocommerce-form-login__submit shopButton" name="login">
                                        Login
                                    </button>
                                </p>
                                <p className="lost_password">
                                    <button
                                        type="button"
                                        className='ml-0 pl-0'
                                        onClick={() => navigate('/my-account/lost-password')}
                                        style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
                                    >
                                        Lost your password?
                                    </button>
                                </p>
                                <div className="clear"></div>
                            </div>
                        </form>
                    )}

                    {/* Coupon Toggle */}
                    <div className="woocommerce-form-coupon-toggle">
                        <div className="woocommerce-info cart-empty" role="status">
                           <span>
                                <WebAssetIcon className='icon-color'/>
                            </span>
                            Have a coupon?
                            <button
                                type="button"
                                className="showcoupon"
                                onClick={() => setShowCoupon(!showCoupon)}
                                style={{ background: 'none', border: 'none', color: 'inherit', textDecoration: 'underline', cursor: 'pointer', padding: '0 5px' }}
                            >
                                Click here to enter your code
                            </button>
                        </div>
                    </div>

                    {/* Coupon Form */}
                    {showCoupon && (
                        <form className="checkout_coupon woocommerce-form-coupon" onSubmit={handleApplyCoupon}>
                            <p>If you have a coupon code, please apply it below.</p>
                            <p className="form-row float-left">
                                <input
                                    type="text"
                                    name="coupon_code"
                                    className="input-text form-control loginInput"
                                    placeholder="Coupon code"
                                    id="coupon_code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                            </p>
                            <p className="form-row float-left">
                                <button type="submit" className="button shopButton" name="apply_coupon">
                                    Apply coupon
                                </button>
                            </p>
                            <div className="clear"></div>
                        </form>
                    )}

                    <div className="woocommerce-notices-wrapper"></div>

                    {/* Checkout Form */}
                    <form name="checkout" method="post" className="checkout woocommerce-checkout my-5" onSubmit={handlePlaceOrder}>
                        <div className="row" id="customer_details">
                            {/* Billing Section */}
                            <div className="col-lg-6 mb-3">
                                <div id="billing_section">
                                    <div className="woocommerce-billing-fields">
                                        <h3>Billing details</h3>
                                        <div className="woocommerce-billing-fields__field-wrapper">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p className="form-row">
                                                        <label htmlFor="billing_first_name">First name&nbsp;<span className="required">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="input-text"
                                                            id="billing_first_name"
                                                            value={billingDetails.firstName}
                                                            onChange={(e) => handleBillingChange('firstName', e.target.value)}
                                                            autoComplete="given-name"
                                                            required
                                                        />
                                                    </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p className="form-row">
                                                        <label htmlFor="billing_last_name">Last name&nbsp;<span className="required">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="input-text"
                                                            id="billing_last_name"
                                                            value={billingDetails.lastName}
                                                            onChange={(e) => handleBillingChange('lastName', e.target.value)}
                                                            autoComplete="family-name"
                                                            required
                                                        />
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="form-row form-row-wide">
                                                <label htmlFor="billing_address_1">Street address&nbsp;<abbr className="required">*</abbr></label>
                                                <input
                                                    type="text"
                                                    className="input-text"
                                                    id="billing_address_1"
                                                    placeholder="House number and street name"
                                                    value={billingDetails.address1}
                                                    onChange={(e) => handleBillingChange('address1', e.target.value)}
                                                    autoComplete="address-line1"
                                                    required
                                                />
                                            </p>
                                            <p className="form-row form-row-wide">
                                                <label htmlFor="billing_address_2">Apartment, suite, unit, etc.&nbsp;<abbr className="required">*</abbr></label>
                                                <input
                                                    type="text"
                                                    className="input-text"
                                                    id="billing_address_2"
                                                    placeholder="Apartment, suite, unit, etc. (optional)"
                                                    value={billingDetails.address2}
                                                    onChange={(e) => handleBillingChange('address2', e.target.value)}
                                                    autoComplete="address-line2"
                                                />
                                            </p>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p className="form-row">
                                                        <label htmlFor="billing_state">Province&nbsp;<abbr className="required">*</abbr></label>
                                                        <select
                                                            id="billing_state"
                                                            className="state_select input-text"
                                                            value={billingDetails.state}
                                                            onChange={(e) => handleBillingChange('state', e.target.value)}
                                                            autoComplete="address-level1"
                                                            required
                                                        >
                                                            {canadianProvinces.map(province => (
                                                                <option key={province.value} value={province.value}>{province.label}</option>
                                                            ))}
                                                        </select>
                                                    </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p className="form-row">
                                                        <label htmlFor="billing_city">Town / City&nbsp;<abbr className="required">*</abbr></label>
                                                        <input
                                                            type="text"
                                                            className="input-text"
                                                            id="billing_city"
                                                            value={billingDetails.city}
                                                            onChange={(e) => handleBillingChange('city', e.target.value)}
                                                            autoComplete="address-level2"
                                                            required
                                                        />
                                                    </p>
                                                </div>
                                            </div>
                                             <p className="form-row form-row-wide">
                                                <label htmlFor="billing_country">Country / Region&nbsp;<span className="required">*</span></label> <br/>
                                                <strong>Canada</strong>
                                                <input type="hidden" id="billing_country" value="CA" />
                                            </p>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p className="form-row">
                                                        <label htmlFor="billing_postcode">Postal code&nbsp;<abbr className="required">*</abbr></label>
                                                        <input
                                                            type="text"
                                                            className="input-text"
                                                            id="billing_postcode"
                                                            value={billingDetails.postcode}
                                                            onChange={(e) => handleBillingChange('postcode', e.target.value)}
                                                            autoComplete="postal-code"
                                                            required
                                                        />
                                                    </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p className="form-row">
                                                        <label htmlFor="billing_phone">Phone&nbsp;<span className="required">*</span></label>
                                                        <input
                                                            type="tel"
                                                            className="input-text"
                                                            id="billing_phone"
                                                            value={billingDetails.phone}
                                                            onChange={(e) => handleBillingChange('phone', e.target.value)}
                                                            autoComplete="tel"
                                                            required
                                                        />
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="form-row form-row-wide">
                                                <label htmlFor="billing_email">Email address&nbsp;<span className="required">*</span></label>
                                                <input
                                                    type="email"
                                                    className="input-text"
                                                    id="billing_email"
                                                    value={billingDetails.email}
                                                    onChange={(e) => handleBillingChange('email', e.target.value)}
                                                    autoComplete="email username"
                                                    required
                                                />
                                            </p>
                                        </div>
                                    </div>

                                    <div className="woocommerce-account-fields">
                                        <p className="form-row form-row-wide create-account">
                                            <label className="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
                                                <input
                                                    className="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
                                                    id="createaccount"
                                                    type="checkbox"
                                                    checked={createAccount}
                                                    onChange={(e) => setCreateAccount(e.target.checked)}
                                                />
                                                <span>Create an account?</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>

                                {/* Shipping Section */}
                                <div id="shipping_section">
                                    <div className="woocommerce-shipping-fields">
                                        <h3 className="my-4">
                                            <label className="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox form d-flex align-items-center">
                                                <input
                                                    id="copy-billing-to-shipping-address"
                                                    className="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox d-block mr-2"
                                                    type="checkbox"
                                                    checked={copyBillingToShipping}
                                                    onChange={(e) => handleCopyBillingToShipping(e.target.checked)}
                                                />
                                                <span>Copy billing to shipping address?</span>
                                            </label>
                                        </h3>

                                        <h3>Shipping details</h3>

                                        <div className="shipping_address">
                                            <div className="woocommerce-shipping-fields__field-wrapper">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <p className="form-row">
                                                            <label htmlFor="shipping_first_name">First name&nbsp;<span className="required">*</span></label>
                                                            <input
                                                                type="text"
                                                                className="input-text"
                                                                id="shipping_first_name"
                                                                value={shippingDetails.firstName}
                                                                onChange={(e) => handleShippingChange('firstName', e.target.value)}
                                                                autoComplete="given-name"
                                                                required
                                                            />
                                                        </p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className="form-row">
                                                            <label htmlFor="shipping_last_name">Last name&nbsp;<span className="required">*</span></label>
                                                            <input
                                                                type="text"
                                                                className="input-text"
                                                                id="shipping_last_name"
                                                                value={shippingDetails.lastName}
                                                                onChange={(e) => handleShippingChange('lastName', e.target.value)}
                                                                autoComplete="family-name"
                                                                required
                                                            />
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="form-row form-row-wide">
                                                    <label htmlFor="shipping_address_1">Street address&nbsp;<abbr className="required">*</abbr></label>
                                                    <input
                                                        type="text"
                                                        className="input-text"
                                                        id="shipping_address_1"
                                                        placeholder="House number and street name"
                                                        value={shippingDetails.address1}
                                                        onChange={(e) => handleShippingChange('address1', e.target.value)}
                                                        autoComplete="address-line1"
                                                        required
                                                    />
                                                </p>
                                                <p className="form-row form-row-wide">
                                                    <label htmlFor="shipping_address_2">Apartment, suite, unit, etc.&nbsp;<abbr className="required">*</abbr></label>
                                                    <input
                                                        type="text"
                                                        className="input-text"
                                                        id="shipping_address_2"
                                                        placeholder="Apartment, suite, unit, etc. (optional)"
                                                        value={shippingDetails.address2}
                                                        onChange={(e) => handleShippingChange('address2', e.target.value)}
                                                        autoComplete="address-line2"
                                                    />
                                                </p>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <p className="form-row">
                                                            <label htmlFor="shipping_state">Province&nbsp;<abbr className="required">*</abbr></label>
                                                            <select
                                                                id="shipping_state"
                                                                className="state_select input-text"
                                                                value={shippingDetails.state}
                                                                onChange={(e) => handleShippingChange('state', e.target.value)}
                                                                autoComplete="address-level1"
                                                                required
                                                            >
                                                                {canadianProvinces.map(province => (
                                                                    <option key={province.value} value={province.value}>{province.label}</option>
                                                                ))}
                                                            </select>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className="form-row">
                                                            <label htmlFor="shipping_city">Town / City&nbsp;<abbr className="required">*</abbr></label>
                                                            <input
                                                                type="text"
                                                                className="input-text"
                                                                id="shipping_city"
                                                                value={shippingDetails.city}
                                                                onChange={(e) => handleShippingChange('city', e.target.value)}
                                                                autoComplete="address-level2"
                                                                required
                                                            />
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="form-row form-row-wide">
                                                    <label htmlFor="shipping_country">Country / Region&nbsp;<span className="required">*</span></label> <br/>
                                                    <strong>Canada</strong>
                                                    <input type="hidden" id="shipping_country" value="CA" />
                                                </p>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <p className="form-row">
                                                            <label htmlFor="shipping_postcode">Postal code&nbsp;<abbr className="required">*</abbr></label>
                                                            <input
                                                                type="text"
                                                                className="input-text"
                                                                id="shipping_postcode"
                                                                value={shippingDetails.postcode}
                                                                onChange={(e) => handleShippingChange('postcode', e.target.value)}
                                                                autoComplete="postal-code"
                                                                required
                                                            />
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="form-row form-row-wide">
                                                    <label htmlFor="shipping_giftcard">Electronic Gift Card&nbsp;<span className="required">*</span></label>
                                                    <input
                                                        type="text"
                                                        className="input-text"
                                                        id="shipping_giftcard"
                                                        value={shippingDetails.giftCard}
                                                        onChange={(e) => handleShippingChange('giftCard', e.target.value)}
                                                        autoComplete="off"
                                                        required
                                                    />
                                                    {/* currently Commented
                                                         <span className="description">Would you rather to receive an immediate Electronic Gift Card directly to your email, instead of physically shipped to your address?</span> 
                                                    */}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="woocommerce-additional-fields">
                                        <p className="form-row form-row-wide">
                                            <label className="checkbox">
                                                <input
                                                    type="checkbox"
                                                    id="newsletter_checkbox"
                                                    checked={newsletter}
                                                    onChange={(e) => setNewsletter(e.target.checked)}
                                                />
                                                <span className='ml-2'>
                                                    Yes, I'm ok with you sending me additional newsletter and email content&nbsp;
                                                    <span className="optional">(optional)</span>
                                                </span>
                                            </label>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary Section */}
                            <div className="col-lg-6">
                                <h3 id="order_review_heading">Order summary</h3>

                                <div id="order_review" className="woocommerce-checkout-review-order">
                                    <table className="shop_table woocommerce-checkout-review-order-table">
                                        <thead>
                                            <tr>
                                                <th className="product-name">Product</th>
                                                <th className="product-total">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map(item => (
                                                <tr key={item.id} className="cart_item">
                                                    <td className="product-name">
                                                        {item.name}&nbsp;
                                                        <strong className="product-quantity">×&nbsp;{item.quantity}</strong>
                                                    </td>
                                                    <td className="product-total">
                                                        <span className="woocommerce-Price-amount amount">
                                                            <bdi>
                                                                <span className="woocommerce-Price-currencySymbol">$</span>
                                                                {(item.price * item.quantity).toFixed(2)}
                                                            </bdi>
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
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
                                            <tr className="order-total">
                                                <th>Total</th>
                                                <td>
                                                    <strong>
                                                        <span className="woocommerce-Price-amount amount">
                                                            <bdi>
                                                                <span className="woocommerce-Price-currencySymbol">$</span>
                                                                {calculateTotal().toFixed(2)}
                                                            </bdi>
                                                        </span>
                                                    </strong>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>

                                    <div id="payment" className="woocommerce-checkout-payment">
                                        <ul className="wc_payment_methods payment_methods methods">
                                            <li className="wc_payment_method payment_method_stripe">
                                                <input
                                                    id="payment_method_stripe"
                                                    type="radio"
                                                    className="input-radio"
                                                    name="payment_method"
                                                    value="stripe"
                                                    checked={paymentMethod === 'stripe'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                />
                                                <label htmlFor="payment_method_stripe">Credit / Debit Card</label>
                                                {paymentMethod === 'stripe' && (
                                                    <div className="payment_box payment_method_stripe">
                                                        <p>Secure payment via Stripe</p>
                                                    </div>
                                                )}
                                            </li>
                                            <li className="wc_payment_method payment_method_stripe_klarna">
                                                <input
                                                    id="payment_method_stripe_klarna"
                                                    type="radio"
                                                    className="input-radio"
                                                    name="payment_method"
                                                    value="stripe_klarna"
                                                    checked={paymentMethod === 'stripe_klarna'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                />
                                                <label htmlFor="payment_method_stripe_klarna">Klarna</label>
                                                {paymentMethod === 'stripe_klarna' && (
                                                    <div className="payment_box payment_method_stripe_klarna">
                                                        <p>Secure payment via Klarna</p>
                                                    </div>
                                                )}
                                            </li>
                                        </ul>

                                        <div className="form-row place-order">
                                            <div className="woocommerce-terms-and-conditions-wrapper">
                                                <div className="woocommerce-privacy-policy-text">
                                                    <p>
                                                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{' '}
                                                        <button
                                                            type="button"
                                                            className='p-0'
                                                            onClick={() => navigate('/?page_id=3')}
                                                            style={{ background: 'none', border: 'none', color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}
                                                        >
                                                            privacy policy
                                                        </button>.
                                                    </p>
                                                </div>
                                            </div>

                                            <div style={{ textAlign: 'right' }}>
                                                <button
                                                    type="submit"
                                                    className="button alt shopButton "
                                                    id="place_order"
                                                >
                                                    Place order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                      <div className="woocommerce-form-coupon-toggle">
                        <div className="woocommerce-info cart-empty" role="status">
                           <span>
                                <WebAssetIcon className='icon-color'/>
                            </span>
                            Thank you for your purchase at Spa A'lita!            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
