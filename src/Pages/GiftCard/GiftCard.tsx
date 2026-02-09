//@ts-nocheck
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { giftCardMockData, giftCardSortOptions } from '../../mockData/giftCardMockData';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';
import { sortProducts, type SortOption } from '../../utils/sortProducts';
import { CART_MESSAGE_TIMEOUT } from '../../utils/constants';
import AddToCartMessage from '../../Component/AddToCartMessage/AddToCartMessage';
import '../../Component/AddToCartMessage/AddToCartMessage.css';

const GiftCardItem = ({ giftCard, onAddToCart }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { title, price, currency, image, slug } = giftCard;

    const handleAddToCart = (e) => {
        e.preventDefault();

        dispatch(addToCart({
            id: giftCard.id,
            name: title,
            price: price,
            image: image.src
        }));

        onAddToCart({ title, price, currency });
    };

    const handleProductClick = () => {
        navigate(`/product/${slug}`, { 
            state: { 
                id: giftCard.id, 
                source: 'giftCard' 
            } 
        });
    };

    return (
        <li className="col-lg-4 col-md-6 col-sm-6 text-center">
            <div 
                onClick={handleProductClick} 
                className="woocommerce-LoopProduct-link woocommerce-loop-product__link clickable"
            >
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

const GiftCard = () => {
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

    const availableGiftCards = useMemo(() => {
        const availableCards = giftCardMockData.filter((card) => card.isAvailable);
        return sortProducts(availableCards, sortBy);
    }, [sortBy]);

    const totalCount = availableGiftCards.length;

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
                                {giftCardSortOptions.map((option) => (
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
