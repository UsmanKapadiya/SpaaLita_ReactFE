// @ts-nocheck
import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { giftCardMockData, giftCardSortOptions } from '../../mockData/giftCardMockData';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';

// Component for individual gift card item
const GiftCardItem = ({ giftCard, onAddToCart }: { giftCard: any; onAddToCart: (item: any) => void }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { title, price, currency, image, slug } = giftCard;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();

        // Dispatch Redux action to add to cart
        dispatch(addToCart({
            id: giftCard.id,
            name: title,
            price: price,
            image: image.src
        }));

        // Trigger success message in parent component
        onAddToCart({ title, price, currency });
    };

    return (
        <li className="col-lg-4 col-md-6 col-sm-6 text-center">
            <Link to={`/product/${slug}`} className="woocommerce-LoopProduct-link woocommerce-loop-product__link">
                <img
                    width={image.width}
                    height={image.height}
                    src={image.src}
                    className={image.className || "attachment-woocommerce_thumbnail size-woocommerce_thumbnail"}
                    alt={image.alt}
                    srcSet={image.srcSet}
                    sizes={image.sizes}
                    loading={image.loading}
                />
            </Link>
            <Link className="product-title" to={`/product/${slug}`}>
                {title}
            </Link>
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

const GiftCard = () => {
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState('menu_order');
    const [showMessage, setShowMessage] = useState(false);
    const [addedItem, setAddedItem] = useState<any>(null);

    // Helper functions for gift card data manipulation
    const getTotalCount = () => giftCardMockData.filter((card: any) => card.isAvailable).length;

    // Handle add to cart callback
    const handleAddToCart = (item: any) => {
        setAddedItem(item);
        setShowMessage(true);
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            setShowMessage(false);
        }, 115000);
    };

    const sortGiftCards = (sortBy: string) => {
        const sortedData = [...giftCardMockData];

        switch (sortBy) {
            case 'price':
                return sortedData.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sortedData.sort((a, b) => b.price - a.price);
            case 'popularity':
                // Mock popularity sorting (could be based on sales data)
                return sortedData.sort((a, b) => b.productId - a.productId);
            case 'date':
                // Mock date sorting (newest first)
                return sortedData.sort((a, b) => b.id - a.id);
            case 'menu_order':
            default:
                // Default order (as defined in array)
                return sortedData.sort((a, b) => a.id - b.id);
        }
    };

    // Get sorted and filtered gift cards based on current sort option
    const availableGiftCards = useMemo(() => {
        return sortGiftCards(sortBy).filter(card => card.isAvailable);
    }, [sortBy]);

    // Get total count for display
    const totalCount = getTotalCount();

    // Handle sort option change
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
                                {giftCardSortOptions.map((option: any) => (
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
                            {availableGiftCards.map((giftCard) => (
                                <GiftCardItem key={giftCard.id} giftCard={giftCard} onAddToCart={handleAddToCart} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftCard;
