import type { FC, ChangeEvent } from 'react';
import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopMockData, shopSortOptions } from '../../mockData/shopMockData';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';
import { sortProducts, type SortOption } from '../../utils/sortProducts';
import { CART_MESSAGE_TIMEOUT } from '../../utils/constants';
import AddToCartMessage from '../../Component/AddToCartMessage/AddToCartMessage';
import '../../Component/AddToCartMessage/AddToCartMessage.css';

interface ShopProduct {
    id: number;
    productId: number;
    title: string;
    price: number;
    currency: string;
    slug: string;
    images: Array<{
        src: string;
        alt: string;
        width?: number;
        height?: number;
        className?: string;
        loading?: string;
        srcSet?: string;
        sizes?: string;
    }>;
    isAvailable: boolean;
}

interface AddedItem {
    title: string;
    price: number;
    currency: string;
}

interface ShopItemProps {
    shop: ShopProduct;
    onAddToCart: (item: AddedItem) => void;
}

// Component for individual shop item
const ShopItem: FC<ShopItemProps> = ({ shop, onAddToCart }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { title, price, currency, images, slug } = shop;
    
    // Use the first image from the images array
    const mainImage = images && images.length > 0 ? images[0] : null;

    const handleAddToCart = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        dispatch(addToCart({
            id: String(shop.id),
            name: title,
            price: price,
            image: mainImage?.src || ''
        }));

        onAddToCart({ title, price, currency });
    }, [dispatch, shop.id, title, price, mainImage?.src, currency, onAddToCart]);

    const handleProductClick = useCallback(() => {
        navigate(`/product/${slug}`, { 
            state: { 
                id: shop.id, 
                source: 'shop' 
            } 
        });
    }, [navigate, slug, shop.id]);

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

const Shop: FC = () => {
    const [sortBy, setSortBy] = useState<SortOption>('menu_order');
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [addedItem, setAddedItem] = useState<AddedItem | null>(null);

    const handleAddToCart = useCallback((item: AddedItem) => {
        setAddedItem(item);
        setShowMessage(true);
        
        const timer = setTimeout(() => {
            setShowMessage(false);
        }, CART_MESSAGE_TIMEOUT);

        return () => clearTimeout(timer);
    }, []);

    const availableProducts = useMemo(() => {
        const availableItems = shopMockData.filter((item: ShopProduct) => item.isAvailable);
        return sortProducts(availableItems, sortBy);
    }, [sortBy]);

    const totalCount = availableProducts.length;

    const handleSortChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value as SortOption);
    }, []);

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
                                {shopSortOptions.map((option: {value: string, title: string, label: string}) => (
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
