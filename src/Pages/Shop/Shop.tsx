// @ts-nocheck
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopMockData, shopSortOptions } from '../../mockData/shopMockData';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';

// Component for individual shop item
const ShopItem = ({ shop, onAddToCart }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { title, price, currency, images, slug } = shop;
    
    // Use the first image from the images array
    const mainImage = images && images.length > 0 ? images[0] : null;

    const handleAddToCart = (e) => {
        e.preventDefault();

        // Dispatch Redux action to add to cart
        dispatch(addToCart({
            id: shop.id,
            name: title,
            price: price,
            image: mainImage?.src || ''
        }));

        // Trigger success message in parent component
        onAddToCart({ title, price, currency });
    };

    const handleProductClick = () => {
        navigate(`/product/${slug}`, { 
            state: { 
                id: shop.id, 
                source: 'shop' 
            } 
        });
    };

    return (
        <li className="col-lg-4 col-md-6 col-sm-6 text-center">
            <div onClick={handleProductClick} style={{ cursor: 'pointer' }} className="woocommerce-LoopProduct-link woocommerce-loop-product__link">
                {mainImage && (
                    <img
                        width={mainImage.width}
                        height={mainImage.height}
                        src={mainImage.src}
                        className={mainImage.className || "attachment-woocommerce_thumbnail size-woocommerce_thumbnail"}
                        alt={mainImage.alt}
                        loading={mainImage.loading}
                    />
                )}
            </div>
            <div className="product-title" onClick={handleProductClick} style={{ cursor: 'pointer' }}>
                {title}
            </div>
            <span className="price">
                <span className="woocommerce-Price-amount amount">
                    <bdi>
                        <span className="woocommerce-Price-currencySymbol">{currency}</span>
                        {price.toFixed(2)}
                    </bdi>
                </span>
            </span>
            <button
                className="d-block add-to-cart"
                onClick={handleAddToCart}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    padding: '0',
                    font: 'inherit',
                    textDecoration: 'underline',
                    width: '100%'
                }}
            >
                Add to cart
            </button>
        </li>
    );
};

const Shop = () => {
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState('menu_order');
    const [showMessage, setShowMessage] = useState(false);
    const [addedItem, setAddedItem] = useState(null);

    const getTotalCount = () => shopMockData.filter(item => item.isAvailable).length;

    // Handle add to cart callback
    const handleAddToCart = (item) => {
        setAddedItem(item);
        setShowMessage(true);
        
        setTimeout(() => {
            setShowMessage(false);
        }, 5000);
    };

    const sortShop = (sortBy) => {
        const sortedData = [...shopMockData];

        switch (sortBy) {
            case 'price':
                return sortedData.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sortedData.sort((a, b) => b.price - a.price);
            case 'popularity':
                return sortedData.sort((a, b) => b.productId - a.productId);
            case 'date':
                return sortedData.sort((a, b) => b.id - a.id);
            case 'menu_order':
            default:
                return sortedData.sort((a, b) => a.id - b.id);
        }
    };

    const availableProducts = useMemo(() => {
        return sortShop(sortBy).filter(item => item.isAvailable);
    }, [sortBy]);

    const totalCount = getTotalCount();

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-3">
                    <div>
                        <div className="berocket_single_filter_widget berocket_single_filter_widget_26 bapf_wid_  bapf_mt_none" data-wid="" data-id="26"></div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="shop">
                        {showMessage && addedItem && (
                            <div className="woocommerce-notices-wrapper">
                                <div className="woocommerce-message d-flex align-items-center" role="alert" tabIndex={-1}>
                                    <span>
                                        <CheckCircleIcon className='woocommerce-checkIcon'/>
                                    </span>
                                    <span className='ml-3'>
                                        "{addedItem.title}" has been added to your cart.{' '}
                                    </span>
                                    <button
                                        onClick={() => navigate('/cart')}
                                        className="button wc-forward shopButton ml-auto"
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'inherit',
                                            cursor: 'pointer',
                                            textDecoration: 'underline'
                                        }}
                                    >
                                        View cart
                                    </button>
                                </div>
                            </div>
                        )}

                        <p className="woocommerce-result-count" role="alert" aria-relevant="all" aria-hidden="false">
                            Showing all {totalCount} results
                        </p>
                        <form className="woocommerce-ordering" method="get">
                            <span className="pl-2">Sort By:</span>
                            <select
                                name="orderby"
                                className="orderby"
                                aria-label="Shop order"
                                value={sortBy}
                                onChange={handleSortChange}
                            >
                                {shopSortOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        title={option.title}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <input type="hidden" name="paged" value="1" />
                        </form>

                        <div className="clear"></div>
                        <ul className="products columns-3">
                            {availableProducts.map((product) => (
                                <ShopItem key={product.id} shop={product} onAddToCart={handleAddToCart} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
