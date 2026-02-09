//@ts-nocheck
import { FC, useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeFromCart, updateQuantity as updateCartQuantity } from '../../store/cartSlice';
import './Cart.css';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const cartItems = useAppSelector((state): CartItem[] => state.cart.items);
  const [couponCode, setCouponCode] = useState<string>('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState<boolean>(false);

  const updateQuantity = useCallback((id: string, newQuantity: number): void => {
    if (newQuantity < 1 || isNaN(newQuantity)) return;
    dispatch(updateCartQuantity({ id, quantity: newQuantity }));
  }, [dispatch]);

  const removeItem = useCallback((id: string): void => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      dispatch(removeFromCart(id));
    }
  }, [dispatch]);

  const getCartTotal = useCallback((): number => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const handleCouponSubmit = useCallback((e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!couponCode.trim()) {
      alert('Please enter a coupon code');
      return;
    }
    
    setIsApplyingCoupon(true);
    // TODO: Implement coupon validation logic
    setTimeout(() => {
      setIsApplyingCoupon(false);
      alert('Coupon applied successfully!');
    }, 500);
  }, [couponCode]);

  const handleQuantityChange = useCallback((e: ChangeEvent<HTMLInputElement>, id: string): void => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      updateQuantity(id, value);
    }
  }, [updateQuantity]);

  const isEmpty = cartItems.length === 0;

  if (isEmpty) {
    return (
      <main className="container cart-page">
        <div className="woocommerce">
          <div className="woocommerce-notices-wrapper" role="alert" aria-live="polite" />
          <div className="wc-empty-cart-message">
            <div className="cart-empty woocommerce-info" role="status">
              <span aria-hidden="true">
                <WebAssetIcon className="icon-color" />
              </span>
              Your cart is currently empty.
            </div>
          </div>
          <p className="return-to-shop">
            <button 
              className="button wc-backward shopButton" 
              onClick={() => navigate('/shop')}
              aria-label="Return to shop"
            >
              Return to shop
            </button>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container cart-page">
      <div className="woocommerce">
        <div className="woocommerce-notices-wrapper" role="alert" aria-live="polite" />
        
        <section aria-labelledby="cart-heading">
          <h2 id="cart-heading" className="sr-only">Shopping Cart</h2>
          
          <form className="woocommerce-cart-form" onSubmit={(e) => e.preventDefault()}>
            <table className="shop_table shop_table_responsive cart woocommerce-cart-form__contents" cellSpacing="0">
              <thead>
                <tr>
                  <th className="product-remove" scope="col">
                    <span className="sr-only">Remove</span>
                  </th>
                  <th className="product-thumbnail" scope="col">
                    <span className="sr-only">Image</span>
                  </th>
                  <th className="product-name" scope="col">Product</th>
                  <th className="product-price" scope="col">Price</th>
                  <th className="product-quantity" scope="col">Quantity</th>
                  <th className="product-subtotal" scope="col">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="woocommerce-cart-form__cart-item cart_item">
                    <td className="product-remove">
                      <button 
                        type="button"
                        className="remove" 
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <ClearIcon aria-hidden="true" />
                      </button>
                    </td>
                    <td className="product-thumbnail">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        width="100" 
                        height="100"
                        className="attachment-custom-thumb size-custom-thumb"
                        loading="lazy"
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
                        <label htmlFor={`quantity-${item.id}`} className="sr-only">
                          Quantity for {item.name}
                        </label>
                        <input 
                          type="number" 
                          id={`quantity-${item.id}`}
                          className="input-text qty text" 
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(e, item.id)}
                          min="1" 
                          max="99"
                          step="1"
                          aria-label={`Quantity for ${item.name}`}
                        />
                      </div>
                    </td>
                    <td className="product-subtotal" data-title="Subtotal">
                      <span className="woocommerce-Price-amount amount">
                        <bdi>
                          <span className="woocommerce-Price-currencySymbol">$</span>
                          {(item.price * item.quantity).toFixed(2)}
                        </bdi>
                      </span>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={6} className="actions">
                    <form className="coupon" onSubmit={handleCouponSubmit}>
                      <label htmlFor="coupon_code">Coupon:</label>
                      <input 
                        type="text" 
                        name="coupon_code" 
                        className="input-text" 
                        id="coupon_code" 
                        value={couponCode}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCouponCode(e.target.value)}
                        placeholder="Coupon code"
                        aria-label="Enter coupon code"
                      />
                      <button 
                        type="submit" 
                        className="button shopButton" 
                        name="apply_coupon"
                        disabled={isApplyingCoupon || !couponCode.trim()}
                        aria-label="Apply coupon"
                      >
                        {isApplyingCoupon ? 'Applying...' : 'Apply coupon'}
                      </button>
                    </form>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </section>

        <section className="cart-collaterals" aria-labelledby="cart-totals-heading">
          <div className="cart_totals pb-5">
            <h2 id="cart-totals-heading">Cart totals</h2>
            <table cellSpacing="0" className="shop_table shop_table_responsive">
              <tbody>
                <tr className="cart-subtotal">
                  <th scope="row">Subtotal</th>
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
                  <th scope="row">Total</th>
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
                aria-label="Proceed to checkout"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Cart;