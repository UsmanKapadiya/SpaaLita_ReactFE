import { FC, useState, useMemo, useCallback, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { applyCoupon } from '../../Services/ProductRelatedServices'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { applyCouponToCart, removeCoupon } from '../../store/cartSlice'
import ClearIcon from '@mui/icons-material/Clear';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import { removeFromCart, updateQuantity as updateCartQuantity, type CartItem } from '../../store/cartSlice';
import './Cart.css';
import { toast } from 'react-toastify';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const Cart: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const debounceRef = useRef<any>(null);

  const cartItems = useAppSelector((state): CartItem[] => state.cart.items);
  const { discountAmount, totalAfterDiscount, appliedCoupon } = useAppSelector(state => state.cart);

  const [couponCode, setCouponCode] = useState<string>('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState<boolean>(false);

  // MUI confirm dialog state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  // Open confirmation dialog
  const removeItem = useCallback((id: string) => {
    setItemToRemove(id);
    setIsConfirmOpen(true);
  }, []);

  // Confirm removal
  const handleConfirmRemove = useCallback(() => {
    if (itemToRemove) {
      dispatch(removeFromCart(itemToRemove));
    }
    setIsConfirmOpen(false);
    setItemToRemove(null);
  }, [dispatch, itemToRemove]);

  // Cancel removal
  const handleCancelRemove = useCallback(() => {
    setIsConfirmOpen(false);
    setItemToRemove(null);
  }, []);

  // Calculate cart total
  const cartTotal = useMemo((): number => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  }, [cartItems]);

  // Sync coupon input with applied coupon
  useEffect(() => {
    if (appliedCoupon) setCouponCode(appliedCoupon);
  }, [appliedCoupon]);

  // Re-apply coupon on cart changes with debounce
  useEffect(() => {
    if (!appliedCoupon || cartItems.length === 0) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const payload = cartItems.map(item => ({
          productId: item.id,
          price: item.price,
          qty: item.qty,
          category: item.category || '',
        }));

        const data = {
          couponCode: appliedCoupon,
          cartItems: payload,
          shippingAmount: 50,
        };

        const response = await applyCoupon(data);

        if (response.success) {
          dispatch(
            applyCouponToCart({
              couponCode: response.data.couponCode,
              discountAmount: response.data.discountAmount || 0,
              freeShippingAmount: response.data.freeShippingAmount || 0,
              totalAfterDiscount: response.data.totalAfterDiscount || cartTotal,
            })
          );
        } else {
          toast.error(response?.message || 'Coupon no longer valid');
          dispatch(removeCoupon());
        }
      } catch (error: any) {
        const message = error?.response?.data?.message || 'Error updating coupon';
        toast.error(message);
        dispatch(removeCoupon());
      }
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [cartItems, appliedCoupon, cartTotal, dispatch]);

  // Update quantity
  const updateQuantity = useCallback(
    (id: string, newQuantity: number): void => {
      if (newQuantity < 1 || newQuantity > 99 || isNaN(newQuantity)) return;
      dispatch(updateCartQuantity({ id, qty: newQuantity }));
    },
    [dispatch]
  );

  const handleQuantityChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: string): void => {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value)) updateQuantity(id, value);
    },
    [updateQuantity]
  );

  // Apply coupon
  const handleCouponSubmit = useCallback(async () => {
    if (!couponCode.trim()) {
      toast.info('Please enter a coupon code');
      return;
    }

    try {
      setIsApplyingCoupon(true);

      const payload = cartItems.map(item => ({
        productId: item.id,
        price: item.price,
        qty: item.qty,
        category: item.category || '',
      }));

      const data = {
        couponCode: couponCode.trim(),
        cartItems: payload,
        shippingAmount: 50,
      };

      const response = await applyCoupon(data);

      if (response.success) {
        toast.success(response.message || 'Coupon applied successfully!');
        dispatch(
          applyCouponToCart({
            couponCode: response.data.couponCode,
            discountAmount: response.data.discountAmount || 0,
            freeShippingAmount: response.data.freeShippingAmount || 0,
            totalAfterDiscount: response.data.totalAfterDiscount || cartTotal,
          })
        );
      } else {
        toast.error(response.message || 'Failed to apply coupon');
      }
    } catch (error: any) {
      const serverMessage =
        error?.response?.data?.message || error?.message || 'Error applying coupon';
      toast.error(serverMessage);
    } finally {
      setIsApplyingCoupon(false);
    }
  }, [couponCode, cartItems, cartTotal, dispatch]);

  // Remove coupon if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && appliedCoupon) {
      dispatch(removeCoupon());
    }
  }, [cartItems, appliedCoupon, dispatch]);

  const isEmpty = cartItems.length === 0;

  if (isEmpty) {
    return (
      <main className="container cart-page">
        <div className="woocommerce">
          <div className="woocommerce-notices-wrapper" role="alert" aria-live="polite" />
          <div className="wc-empty-cart-message">
            <div className="cart-empty woocommerce-info justify-start" role="status">
              <span aria-hidden="true">
                <WebAssetIcon className="icon-color" />
              </span>
              Your cart is currently empty.
            </div>
          </div>
          <p className="return-to-shop">
            <button className="button wc-backward shopButton" onClick={() => navigate('/shop')} aria-label="Return to shop">
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
          <form className="woocommerce-cart-form" onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
            <table className="shop_table shop_table_responsive cart woocommerce-cart-form__contents" cellSpacing={0}>
              <thead>
                <tr>
                  <th className="product-remove" scope="col"><span className="sr-only">Remove</span></th>
                  <th className="product-thumbnail" scope="col"><span className="sr-only">Image</span></th>
                  <th className="product-name" scope="col">Product</th>
                  <th className="product-price" scope="col">Price</th>
                  <th className="product-quantity" scope="col">Quantity</th>
                  <th className="product-subtotal" scope="col">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} className="woocommerce-cart-form__cart-item cart_item">
                    <td className="product-remove">
                      <button type="button" className="remove" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name} from cart`}>
                        <ClearIcon aria-hidden="true" />
                      </button>
                    </td>
                    <td className="product-thumbnail">
                      <img src={item.image} alt={item.name} width={100} height={100} className="attachment-custom-thumb size-custom-thumb" loading="lazy" />
                    </td>
                    <td className="product-name" data-title="Product"><span>{item.name}</span></td>
                    <td className="product-price" data-title="Price">
                      <span className="woocommerce-Price-amount amount"><bdi><span className="woocommerce-Price-currencySymbol">$</span>{item.price.toFixed(2)}</bdi></span>
                    </td>
                    <td className="product-quantity" data-title="Quantity">
                      <div className="quantity">
                        <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity for {item.name}</label>
                        <input type="number" id={`quantity-${item.id}`} className="input-text qty text" value={item.qty} onChange={e => handleQuantityChange(e, item.id)} min={1} max={99} step={1} aria-label={`Quantity for ${item.name}`} />
                      </div>
                    </td>
                    <td className="product-subtotal" data-title="Subtotal">
                      <span className="woocommerce-Price-amount amount"><bdi><span className="woocommerce-Price-currencySymbol">$</span>{(item.price * item.qty).toFixed(2)}</bdi></span>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td colSpan={6} className="actions">
                    <div className="coupon">
                      {appliedCoupon ? (
                        <div className="applied-coupon">
                          <span>Coupon Applied: <strong>{appliedCoupon}</strong></span>
                          <button type="button" className="button shopButton" onClick={() => dispatch(removeCoupon())} aria-label="Remove coupon">Remove</button>
                        </div>
                      ) : (
                        <>
                          <label htmlFor="coupon_code">Coupon:</label>
                          <input type="text" name="coupon_code" className="input-text" id="coupon_code" value={couponCode} onChange={e => setCouponCode(e.target.value)} placeholder="Coupon code" aria-label="Enter coupon code" />
                          <button type="button" className="button shopButton" onClick={handleCouponSubmit} disabled={isApplyingCoupon || !couponCode.trim()} aria-label="Apply coupon">
                            {isApplyingCoupon ? 'Applying...' : 'Apply coupon'}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </form>
        </section>

        <section className="cart-collaterals" aria-labelledby="cart-totals-heading">
          <div className="cart_totals pb-5">
            <h2 id="cart-totals-heading">Cart totals</h2>
            <table cellSpacing={0} className="shop_table shop_table_responsive">
              <tbody>
                <tr className="cart-subtotal">
                  <th scope="row">Subtotal</th>
                  <td data-title="Subtotal">
                    <span className="woocommerce-Price-amount amount"><bdi><span className="woocommerce-Price-currencySymbol">$</span>{cartTotal.toFixed(2)}</bdi></span>
                  </td>
                </tr>

                {discountAmount > 0 && (
                  <tr className="cart-discount">
                    <th scope="row">Discount</th>
                    <td data-title="Discount">
                      <span className="woocommerce-Price-amount amount"><bdi><span className="woocommerce-Price-currencySymbol">-</span>{discountAmount.toFixed(2)}</bdi></span>
                    </td>
                  </tr>
                )}

                <tr className="order-total">
                  <th scope="row">Total</th>
                  <td data-title="Total">
                    <strong>
                      <span className="woocommerce-Price-amount amount"><bdi><span className="woocommerce-Price-currencySymbol">$</span>{totalAfterDiscount ? totalAfterDiscount.toFixed(2) : cartTotal.toFixed(2)}</bdi></span>
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="wc-proceed-to-checkout">
              <button className="checkout-button button alt wc-forward shopButton" onClick={() => navigate('/checkout')} aria-label="Proceed to checkout">
                Proceed to checkout
              </button>
            </div>
          </div>
        </section>

        {/* MUI Confirm Dialog */}
        <Dialog
          open={isConfirmOpen}
          onClose={handleCancelRemove}
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle id="confirm-dialog-title">Confirm Remove</DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-dialog-description">
              Are you sure you want to remove this item from your cart?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelRemove} color="inherit">
              Cancel
            </Button>
            <Button onClick={handleConfirmRemove} color="error" variant="contained">
              Remove
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    </main>
  );
};

export default Cart;