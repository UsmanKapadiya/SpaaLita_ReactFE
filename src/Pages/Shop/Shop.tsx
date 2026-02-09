//@ts-nocheck
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopMockData, shopSortOptions } from '../../mockData/shopMockData';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';
import { sortProducts, type SortOption } from '../../utils/sortProducts';
import { CART_MESSAGE_TIMEOUT } from '../../utils/constants';
import AddToCartMessage from '../../Component/AddToCartMessage/AddToCartMessage';
import '../../Component/AddToCartMessage/AddToCartMessage.css';

// Component for individual shop item
const ShopItem = ({ shop, onAddToCart }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { title, price, currency, images, slug } = shop;
    
    // Use the first image from the images array
    const mainImage = images && images.length > 0 ? images[0] : null;

    const handleAddToCart = (e) => {
        e.preventDefault();

        dispatch(addToCart({
            id: shop.id,
            name: title,
            price: price,
            image: mainImage?.src || ''
        }));

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
            <div 
                onClick={handleProductClick} 
                className="woocommerce-LoopProduct-link woocommerce-loop-product__link clickable"
            >
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
            <div className="product-title clickable" onClick={handleProductClick}>
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
                className="d-block add-to-cart add-to-cart-button"
                onClick={handleAddToCart}
            >
                Add to cart
            </button>
        </li>
    );
};

const Shop = () => {
    const [sortBy, setSortBy] = useState('menu_order');
    const [showMessage, setShowMessage] = useState(false);
    const [addedItem, setAddedItem] = useState(null);

    const handleAddToCart = (item) => {
        setAddedItem(item);
        setShowMessage(true);
        
        setTimeout(() => {
            setShowMessage(false);
        }, CART_MESSAGE_TIMEOUT);
    };

    const availableProducts = useMemo(() => {
        const availableItems = shopMockData.filter((item: any) => item.isAvailable);
        return sortProducts(availableItems, sortBy);
    }, [sortBy]);

    const totalCount = availableProducts.length;

    const handleSortChange = (event) => {
        setSortBy(event.target.value as SortOption);
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
                            <AddToCartMessage itemTitle={addedItem.title} />
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
                                {shopSortOptions.map((option: any) => (
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
