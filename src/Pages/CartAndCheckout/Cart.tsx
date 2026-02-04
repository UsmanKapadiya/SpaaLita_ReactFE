import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'
import WebAssetIcon from '@mui/icons-material/WebAsset';
import DeleteIcon from '@mui/icons-material/Delete';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    subtotal: number;
}

const Cart = () => {
    const navigate = useNavigate();
       const [cartItems, setCartItems] = useState<CartItem[]>([])
    // Mock cart items for demonstration - replace with actual cart state management
    // const [cartItems, setCartItems] = useState<CartItem[]>([
    //     {
    //         id: '1',
    //         name: 'Active Pureness Corrector',
    //         price: 47.00,
    //         quantity: 1,
    //         image: 'https://spaalita.ca/wp-content/uploads/2021/06/CZ-CORRECTOR2-100x100.png',
    //         subtotal: 47.00
    //     },
    //     {
    //         id: '2',
    //         name: 'Gift Card - $100.00',
    //         price: 100.00,
    //         quantity: 1,
    //         image: 'https://spaalita.ca/wp-content/uploads/2021/06/ezgif.com-gif-maker-1-75x100.jpg',
    //         subtotal: 100.00
    //     }
    // ]);

    const [couponCode, setCouponCode] = useState('');

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: newQuantity, subtotal: item.price * newQuantity }
                    : item
            )
        );
    };

    const removeItem = (id: string) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.subtotal, 0);
    };

    const isEmpty = cartItems.length === 0;
    return (
        <div className="container">
            {isEmpty ? (
                // Empty Cart UI
                <div className="woocommerce">
                    <div className="woocommerce-notices-wrapper"></div>
                    <div className="wc-empty-cart-message">
                        <div className="cart-empty woocommerce-info" role="status">
                            <span>
                                <WebAssetIcon className='icon-color'/>
                            </span>
                            Your cart is currently empty.
                        </div>
                    </div>
                    <p className="return-to-shop">
                        <button 
                            className="button wc-backward shopButton" 
                            onClick={() => navigate('/shop')}
                        >
                            Return to shop
                        </button>
                    </p>
                </div>
            ) : (
                // Cart with Items UI
                <div className="woocommerce">
                    <div className="woocommerce-notices-wrapper"></div>
                    <form className="woocommerce-cart-form" onSubmit={(e) => e.preventDefault()}>
                        <table className="shop_table shop_table_responsive cart woocommerce-cart-form__contents" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th className="product-remove">&nbsp;</th>
                                    <th className="product-thumbnail">&nbsp;</th>
                                    <th className="product-name">Product</th>
                                    <th className="product-price">Price</th>
                                    <th className="product-quantity">Quantity</th>
                                    <th className="product-subtotal">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id} className="woocommerce-cart-form__cart-item cart_item">
                                        <td className="product-remove">
                                            <button 
                                                type="button"
                                                className="remove" 
                                                aria-label="Remove this item"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </td>
                                        <td className="product-thumbnail">
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                width="100" 
                                                height="100"
                                                className="attachment-custom-thumb size-custom-thumb"
                                            />
                                        </td>
                                        <td className="product-name" data-title="Product">
                                            <span>{item.name}</span>
                                        </td>
                                        <td className="product-price" data-title="Price">
                                            <span className="woocommerce-Price-amount amount">
                                                <bdi>
                                                    <span className="woocommerce-Price-currencySymbol">$</span>
                                                    {item.price.toFixed(2)}
                                                </bdi>
                                            </span>
                                        </td>
                                        <td className="product-quantity" data-title="Quantity">
                                            <div className="quantity">
                                                <input 
                                                    type="number" 
                                                    className="input-text qty text" 
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                    min="1" 
                                                    step="1"
                                                />
                                            </div>
                                        </td>
                                        <td className="product-subtotal" data-title="Subtotal">
                                            <span className="woocommerce-Price-amount amount">
                                                <bdi>
                                                    <span className="woocommerce-Price-currencySymbol">$</span>
                                                    {item.subtotal.toFixed(2)}
                                                </bdi>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={6} className="actions">
                                        <div className="coupon">
                                            <label htmlFor="coupon_code">Coupon:</label>
                                            <input 
                                                type="text" 
                                                name="coupon_code" 
                                                className="input-text" 
                                                id="coupon_code" 
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                placeholder="Coupon code"
                                            />
                                            <button type="button" className="button shopButton" name="apply_coupon">
                                                Apply coupon
                                            </button>
                                        </div>
                                        
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>

                    <div className="cart-collaterals ">
                        <div className="cart_totals pb-5">
                            <h2>Cart totals</h2>
                            <table cellSpacing="0" className="shop_table shop_table_responsive">
                                <tbody>
                                    <tr className="cart-subtotal">
                                        <th>Subtotal</th>
                                        <td data-title="Subtotal">
                                            <span className="woocommerce-Price-amount amount">
                                                <bdi>
                                                    <span className="woocommerce-Price-currencySymbol">$</span>
                                                    {getCartTotal().toFixed(2)}
                                                </bdi>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="order-total">
                                        <th>Total</th>
                                        <td data-title="Total">
                                            <strong>
                                                <span className="woocommerce-Price-amount amount">
                                                    <bdi>
                                                        <span className="woocommerce-Price-currencySymbol">$</span>
                                                        {getCartTotal().toFixed(2)}
                                                    </bdi>
                                                </span>
                                            </strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="wc-proceed-to-checkout">
                                <button 
                                    className="checkout-button button alt wc-forward shopButton"
                                    onClick={() => navigate('/checkout')}
                                >
                                    Proceed to checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Cart