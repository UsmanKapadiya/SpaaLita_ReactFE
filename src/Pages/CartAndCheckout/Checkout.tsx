import type { FC, FormEvent, ChangeEvent } from 'react';
import { useState, useCallback, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
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

interface LoginData {
    username: string;
    password: string;
}

interface Province {
    value: string;
    label: string;
}

const CANADIAN_PROVINCES: Province[] = [
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

const INITIAL_BILLING_DETAILS: BillingDetails = {
    firstName: 'John',
    lastName: 'Doe',
    address1: '123 Test St',
    address2: '',
    country: 'CA',
    state: 'ON',
    city: 'Toronto',
    postcode: 'M1M1M1',
    phone: '1234567890',
    email: 'john.doe@example.com'
};

const INITIAL_SHIPPING_DETAILS: ShippingDetails = {
    firstName: 'John',
    lastName: 'Doe',
    address1: '123 Test St',
    address2: '',
    state: 'ON',
    city: 'Toronto',
    country: 'CA',
    postcode: 'M1M1M1',
    giftCard: ''
};

const CART_ITEMS: CartItem[] = [
    { id: '1', name: 'Test Product', price: 105.00, quantity: 1 }
];

type PaymentMethod = 'stripe' | 'stripe_klarna';

const stripePromise = loadStripe('pk_test_51P3EWFSBmT8I69xuNp894I2VxHMSiezZJDzTmNLkoUB6mwEAUho9V1bRLo6hnwudpY98J5fQjRwxvqfL3OjVxElr00Kb3IzDhr');

const StripeCheckoutForm: FC<{ amount: number }> = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [orderResponse, setOrderResponse] = useState<string | null>(null);

    // Dummy token for testing
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5M2ZhNTcxM2JlNGUzMTRiNmM2NzA1NiIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQHNwYWFsaXRhLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3MTIzNzc1MCwiZXhwIjoxNzcxMjQxMzUwfQ.9CRPwA5WKKaQuLAicNI1KayaUV-7o5-yGS06lkbEaSw";
    // Dummy productId for testing
    const productId = "1";

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setProcessing(true);
        setError(null);
        setOrderResponse(null);
        // 1. Create order and get clientSecret from backend
        const orderRes = await fetch("http://localhost:5000/api/orders/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                items: [
                    {
                        productId: "698c34caa15147e1fa89768b",
                        qty: 1
                    }
                ],
                totalAmount: amount,
                shippingAddress: "123 Main St, City"
            })
        });
        const orderData = await orderRes.json();
        setOrderResponse(JSON.stringify(orderData, null, 2));
        if (!orderData.clientSecret) {
            setProcessing(false);
            setError('No clientSecret returned from backend');
            return;
        }
        // 2. Confirm payment with Stripe
        const result = await stripe.confirmCardPayment(orderData.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)!,
            },
        });
        if (result.error) {
            setProcessing(false);
            setError(result.error.message || 'Payment failed');
        } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
            setSuccess(true);
            setProcessing(false);
        } else {
            setProcessing(false);
        }
    };

    return (
        <div style={{ marginTop: 16 }}>
            <CardElement options={{ hidePostalCode: true }} />
            <button
                type="button"
                disabled={!stripe || processing || success}
                className="button alt shopButton"
                style={{ marginTop: 16 }}
                onClick={handleSubmit}
            >
                {processing ? 'Processing...' : success ? 'Payment Successful' : 'Pay Now'}
            </button>
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
            {success && <div style={{ color: 'green', marginTop: 8 }}>Payment successful!</div>}
            {orderResponse && <div style={{ marginTop: 8, wordBreak: 'break-all' }}><strong>Order API Response:</strong> {orderResponse}</div>}
        </div>
    );
};

const Checkout: FC = () => {
    const navigate = useNavigate();

    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [showCoupon, setShowCoupon] = useState<boolean>(false);
    const [couponCode, setCouponCode] = useState<string>('');
    const [createAccount, setCreateAccount] = useState<boolean>(false);
    const [copyBillingToShipping, setCopyBillingToShipping] = useState<boolean>(false);
    const [newsletter, setNewsletter] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const [loginData, setLoginData] = useState<LoginData>({
        username: '',
        password: ''
    });

    const [billingDetails, setBillingDetails] = useState<BillingDetails>(INITIAL_BILLING_DETAILS);
    const [shippingDetails, setShippingDetails] = useState<ShippingDetails>(INITIAL_SHIPPING_DETAILS);
    const [cartItems] = useState<CartItem[]>(CART_ITEMS);

    const calculateTotal = useCallback((): number => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [cartItems]);

    const handleBillingChange = useCallback((field: keyof BillingDetails, value: string): void => {
        setBillingDetails(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleShippingChange = useCallback((field: keyof ShippingDetails, value: string): void => {
        setShippingDetails(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleCopyBillingToShipping = useCallback((checked: boolean): void => {
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
    }, [billingDetails]);

    const handlePlaceOrder = useCallback((e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // Stripe payment handled in StripeCheckoutForm
        if (paymentMethod !== 'stripe') {
            alert('Order placed successfully!');
        }
    }, [paymentMethod]);

    const handleApplyCoupon = useCallback((e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // TODO: Implement coupon validation logic
        console.log('Applying coupon:', couponCode);
        alert('Coupon applied!');
    }, [couponCode]);

    const handleLogin = useCallback((e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // TODO: Implement authentication logic
        console.log('Login attempt:', loginData);
        alert('Logged in successfully!');
    }, [loginData]);

    const renderInfoBox = (message: string, showButton: boolean, buttonText: string, onClick: () => void) => (
        <div className="woocommerce-info cart-empty" style={{ justifyContent: 'flex-start' }} role="status">
            <span>
                <WebAssetIcon className="icon-color" />
            </span>
            {message}
            {showButton && (
                <button
                    type="button"
                    onClick={onClick}
                    className="showlogin"
                    style={{ background: 'none', border: 'none', color: 'inherit', textDecoration: 'underline', cursor: 'pointer', padding: '0 5px' }}
                    aria-label={buttonText}
                >
                    {buttonText}
                </button>
            )}
        </div>
    );

    const renderAddressFields = <T extends BillingDetails | ShippingDetails>(
        type: 'billing' | 'shipping',
        details: T,
        handleChange: (field: keyof T, value: string) => void
    ) => (
        <>
            <div className="row">
                <div className="col-md-6">
                    <p className="form-row">
                        <label htmlFor={`${type}_first_name`}>
                            First name&nbsp;<span className="required" aria-label="required">*</span>
                        </label>
                        <input
                            type="text"
                            className="input-text form-control"
                            id={`${type}_first_name`}
                            value={details.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            autoComplete="given-name"
                            required
                            aria-required="true"
                        />
                    </p>
                </div>
                <div className="col-md-6">
                    <p className="form-row">
                        <label htmlFor={`${type}_last_name`}>
                            Last name&nbsp;<span className="required" aria-label="required">*</span>
                        </label>
                        <input
                            type="text"
                            className="input-text form-control"
                            id={`${type}_last_name`}
                            value={details.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            autoComplete="family-name"
                            required
                            aria-required="true"
                        />
                    </p>
                </div>
            </div>

            <p className="form-row form-row-wide">
                <label htmlFor={`${type}_address_1`}>
                    Street address&nbsp;<abbr className="required" title="required">*</abbr>
                </label>
                <input
                    type="text"
                    className="input-text form-control"
                    id={`${type}_address_1`}
                    placeholder="House number and street name"
                    value={details.address1}
                    onChange={(e) => handleChange('address1', e.target.value)}
                    autoComplete="address-line1"
                    required
                    aria-required="true"
                />
            </p>

            <p className="form-row form-row-wide">
                <label htmlFor={`${type}_address_2`}>
                    Apartment, suite, unit, etc.&nbsp;<span className="optional">(optional)</span>
                </label>
                <input
                    type="text"
                    className="input-text form-control"
                    id={`${type}_address_2`}
                    placeholder="Apartment, suite, unit, etc."
                    value={details.address2}
                    onChange={(e) => handleChange('address2', e.target.value)}
                    autoComplete="address-line2"
                />
            </p>

            <div className="row">
                <div className="col-md-6">
                    <p className="form-row">
                        <label htmlFor={`${type}_state`}>
                            Province&nbsp;<abbr className="required" title="required">*</abbr>
                        </label>
                        <select
                            id={`${type}_state`}
                            className="state_select input-text form-control"
                            value={details.state}
                            onChange={(e) => handleChange('state', e.target.value)}
                            autoComplete="address-level1"
                            required
                            aria-required="true"
                        >
                            {CANADIAN_PROVINCES.map(province => (
                                <option key={province.value} value={province.value}>
                                    {province.label}
                                </option>
                            ))}
                        </select>
                    </p>
                </div>
                <div className="col-md-6">
                    <p className="form-row">
                        <label htmlFor={`${type}_city`}>
                            Town / City&nbsp;<abbr className="required" title="required">*</abbr>
                        </label>
                        <input
                            type="text"
                            className="input-text form-control"
                            id={`${type}_city`}
                            value={details.city}
                            onChange={(e) => handleChange('city', e.target.value)}
                            autoComplete="address-level2"
                            required
                            aria-required="true"
                        />
                    </p>
                </div>
            </div>

            <p className="form-row form-row-wide">
                <label htmlFor={`${type}_country`}>
                    Country / Region&nbsp;<span className="required" aria-label="required">*</span>
                </label>
                <br />
                <strong>Canada</strong>
                <input type="hidden" id={`${type}_country`} value="CA" />
            </p>

            <p className="form-row">
                <label htmlFor={`${type}_postcode`}>
                    Postal code&nbsp;<abbr className="required" title="required">*</abbr>
                </label>
                <input
                    type="text"
                    className="input-text form-control"
                    id={`${type}_postcode`}
                    value={details.postcode}
                    onChange={(e) => handleChange('postcode', e.target.value)}
                    autoComplete="postal-code"
                    required
                    aria-required="true"
                />
            </p>
        </>
    );

    return (
        <main className="container checkout-page">
            <div className="woocommerce">
                <div className="woocommerce-notices-wrapper" role="alert" aria-live="polite" />

                {/* Login Section */}
                <div className="woocommerce-form-login-toggle mb-4">
                    {renderInfoBox(
                        'Returning customer?',
                        true,
                        'Click here to login',
                        () => setShowLogin(!showLogin)
                    )}

                    {showLogin && (
                        <form className="woocommerce-form woocommerce-form-login login my-3" onSubmit={handleLogin}>
                            <div className="w-75">
                                <p>If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing section.</p>

                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="form-row">
                                            <label htmlFor="username">
                                                Username or email&nbsp;<span className="required" aria-label="required">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input-text form-control checkoutInput loginInput"
                                                name="username"
                                                id="username"
                                                value={loginData.username}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                    setLoginData({ ...loginData, username: e.target.value })
                                                }
                                                autoComplete="username"
                                                required
                                                aria-required="true"
                                            />
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="form-row">
                                            <label htmlFor="password">
                                                Password&nbsp;<span className="required" aria-label="required">*</span>
                                            </label>
                                            <input
                                                className="input-text form-control loginInput"
                                                type="password"
                                                name="password"
                                                id="password"
                                                value={loginData.password}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                    setLoginData({ ...loginData, password: e.target.value })
                                                }
                                                autoComplete="current-password"
                                                required
                                                aria-required="true"
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
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
                                        />
                                        <span className="ml-1">Remember me</span>
                                    </label>
                                    <button type="submit" className="woocommerce-button button woocommerce-form-login__submit shopButton" name="login">
                                        Login
                                    </button>
                                </p>
                                <p className="lost_password">
                                    <button
                                        type="button"
                                        className="ml-0 pl-0"
                                        onClick={() => navigate('/my-account/lost-password')}
                                        aria-label="Reset password"
                                        style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
                                    >
                                        Lost your password?
                                    </button>
                                </p>
                            </div>
                        </form>
                    )}
                </div>

                {/* Coupon Section */}
                <div className="woocommerce-form-coupon-toggle mb-4">
                    {renderInfoBox(
                        'Have a coupon?',
                        true,
                        'Click here to enter your code',
                        () => setShowCoupon(!showCoupon)
                    )}

                    {showCoupon && (
                        <form className="checkout_coupon woocommerce-form-coupon my-3" onSubmit={handleApplyCoupon}>
                            <p>If you have a coupon code, please apply it below.</p>
                            <div className="d-flex gap-2">
                                <input
                                    type="text"
                                    name="coupon_code"
                                    className="input-text form-control loginInput"
                                    placeholder="Coupon code"
                                    id="coupon_code"
                                    value={couponCode}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCouponCode(e.target.value)}
                                    aria-label="Coupon code"
                                />
                                <button type="submit" className="button shopButton" name="apply_coupon">
                                    Apply coupon
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Checkout Form */}
                <form name="checkout" method="post" className="checkout woocommerce-checkout my-5" onSubmit={handlePlaceOrder}>
                    <div className="row" id="customer_details">
                        {/* Billing & Shipping Section */}
                        <div className="col-lg-6 mb-3">
                            {/* Billing Details */}
                            <section aria-labelledby="billing-heading">
                                <h3 id="billing-heading">Billing details</h3>
                                <div className="woocommerce-billing-fields__field-wrapper">
                                    {renderAddressFields('billing', billingDetails, handleBillingChange)}

                                    <p className="form-row">
                                        <label htmlFor="billing_phone">
                                            Phone&nbsp;<span className="required" aria-label="required">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            className="input-text form-control"
                                            id="billing_phone"
                                            value={billingDetails.phone}
                                            onChange={(e) => handleBillingChange('phone', e.target.value)}
                                            autoComplete="tel"
                                            required
                                            aria-required="true"
                                        />
                                    </p>

                                    <p className="form-row form-row-wide">
                                        <label htmlFor="billing_email">
                                            Email address&nbsp;<span className="required" aria-label="required">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="input-text form-control"
                                            id="billing_email"
                                            value={billingDetails.email}
                                            onChange={(e) => handleBillingChange('email', e.target.value)}
                                            autoComplete="email"
                                            required
                                            aria-required="true"
                                        />
                                    </p>
                                </div>

                                <div className="woocommerce-account-fields">
                                    <p className="form-row form-row-wide create-account">
                                        <label className="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
                                            <input
                                                className="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
                                                id="createaccount"
                                                type="checkbox"
                                                checked={createAccount}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => setCreateAccount(e.target.checked)}
                                            />
                                            <span className="ml-1">Create an account?</span>
                                        </label>
                                    </p>
                                </div>
                            </section>

                            {/* Shipping Details */}
                            <section aria-labelledby="shipping-heading" className="mt-4">
                                <h3 className="my-4">
                                    <label className="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox d-flex align-items-center">
                                        <input
                                            id="copy-billing-to-shipping-address"
                                            className="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox mr-2"
                                            type="checkbox"
                                            checked={copyBillingToShipping}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleCopyBillingToShipping(e.target.checked)}
                                        />
                                        <span>Copy billing to shipping address?</span>
                                    </label>
                                </h3>

                                <h3 id="shipping-heading">Shipping details</h3>
                                <div className="woocommerce-shipping-fields__field-wrapper">
                                    {renderAddressFields('shipping', shippingDetails, handleShippingChange)}

                                    <p className="form-row form-row-wide">
                                        <label htmlFor="shipping_giftcard">
                                            Electronic Gift Card&nbsp;<span className="required" aria-label="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="input-text form-control"
                                            id="shipping_giftcard"
                                            value={shippingDetails.giftCard}
                                            onChange={(e) => handleShippingChange('giftCard', e.target.value)}
                                            autoComplete="off"
                                            required
                                            aria-required="true"
                                        />
                                    </p>
                                </div>

                                <div className="woocommerce-additional-fields mt-3">
                                    <p className="form-row form-row-wide">
                                        <label className="checkbox">
                                            <input
                                                type="checkbox"
                                                id="newsletter_checkbox"
                                                checked={newsletter}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewsletter(e.target.checked)}
                                            />
                                            <span className="ml-2">
                                                Yes, I'm ok with you sending me additional newsletter and email content&nbsp;
                                                <span className="optional">(optional)</span>
                                            </span>
                                        </label>
                                    </p>
                                </div>
                            </section>
                        </div>

                        {/* Order Summary Section */}
                        <div className="col-lg-6">
                            <section aria-labelledby="order-summary-heading">
                                <h3 id="order-summary-heading">Order summary</h3>

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
                                        <fieldset>
                                            <legend className="sr-only">Payment method</legend>
                                            <ul className="wc_payment_methods payment_methods methods">
                                                <li className="wc_payment_method payment_method_stripe">
                                                    <input
                                                        id="payment_method_stripe"
                                                        type="radio"
                                                        className="input-radio"
                                                        name="payment_method"
                                                        value="stripe"
                                                        checked={paymentMethod === 'stripe'}
                                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPaymentMethod(e.target.value as PaymentMethod)}
                                                    />
                                                    <label htmlFor="payment_method_stripe">Credit / Debit Card</label>
                                                    {paymentMethod === 'stripe' && (
                                                        <div className="payment_box payment_method_stripe">
                                                            <p>Secure payment via Stripe</p>
                                                            <Elements stripe={stripePromise}>
                                                                <StripeCheckoutForm amount={calculateTotal()} />
                                                            </Elements>
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
                                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPaymentMethod(e.target.value as PaymentMethod)}
                                                    />
                                                    <label htmlFor="payment_method_stripe_klarna">Klarna</label>
                                                    {paymentMethod === 'stripe_klarna' && (
                                                        <div className="payment_box payment_method_stripe_klarna">
                                                            <p>Secure payment via Klarna</p>
                                                        </div>
                                                    )}
                                                </li>
                                            </ul>
                                        </fieldset>

                                        <div className="form-row place-order">
                                            <div className="woocommerce-terms-and-conditions-wrapper">
                                                <div className="woocommerce-privacy-policy-text">
                                                    <p>
                                                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{' '}
                                                        <button
                                                            type="button"
                                                            className="p-0"
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
                                                    className="button alt shopButton"
                                                    id="place_order"
                                                >
                                                    Place order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </form>

                <div className="woocommerce-form-coupon-toggle mt-4">
                    {renderInfoBox('Thank you for your purchase at Spa A\'lita!', false, '', () => { })}
                </div>
            </div>
        </main>
    );
};

export default Checkout;
