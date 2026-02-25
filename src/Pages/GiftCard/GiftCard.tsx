import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { giftCardSortOptions } from '../../mockData/giftCardMockData';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';
import { sortProducts, type SortOption } from '../../utils/sortProducts';
import { CART_MESSAGE_TIMEOUT } from '../../utils/constants';
import AddToCartMessage from '../../Component/AddToCartMessage/AddToCartMessage';
import { getAllGiftCard } from '../../Services/GiftCardServices'
import '../../Component/AddToCartMessage/AddToCartMessage.css';


interface GiftCardItemType {
    _id: string;
    productName: string;
    price: number;
    status: string; // 'active' | 'inactive'
    productImages?: { src: string; alt?: string }[]; // optional
}

interface GiftCardItemProps {
    giftCard: GiftCardItemType;
    onAddToCart: (item: GiftCardItemType) => void;
}

type SortOption = "menu_order" | "price_asc" | "price_desc" | "title_asc" | "title_desc";


const GiftCardItem: React.FC<GiftCardItemProps> = ({ giftCard, onAddToCart }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const imageUrl = giftCard.productImages?.[0]?.src || 'https://spaalita.ca/wp-content/uploads/2021/06/ezgif.com-gif-maker-1-180x180.jpg';

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(addToCart({
            id: giftCard._id,
            name: giftCard.productName,
            price: giftCard.price,
            image: imageUrl
        }));
        onAddToCart(giftCard);
    };

    const handleProductClick = () => {
        navigate(`/product/${giftCard._id}`, {
            state: { source: 'giftCard' }
        });
    };

    return (
        <li className="col-lg-4 col-md-6 col-sm-6 text-center">
            <div onClick={handleProductClick} className="clickable">
                <img
                    src={imageUrl}
                    alt={giftCard.productName}
                    className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                />
            </div>
            <div className="product-title clickable" onClick={handleProductClick}>
                {giftCard.productName}
            </div>
            <span className="price">
                <bdi>${giftCard.price.toFixed(2)}</bdi>
            </span>
            <button className="d-block add-to-cart add-to-cart-button" onClick={handleAddToCart}>
                Add to cart
            </button>
        </li>
    );
};

const GiftCard: React.FC = () => {
    const [giftCards, setGiftCards] = useState<GiftCardItemType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [sortBy, setSortBy] = useState<SortOption>("menu_order");
    const [showMessage, setShowMessage] = useState(false);
    const [addedItem, setAddedItem] = useState<GiftCardItemType | null>(null);

    useEffect(() => {
        const fetchGiftCards = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getAllGiftCard();

                if (!response.success || !response.data?.length) {
                    throw new Error("No gift cards found.");
                }

                setGiftCards(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load gift cards.");
            } finally {
                setLoading(false);
            }
        };
        fetchGiftCards();
    }, []);

    const availableGiftCards = useMemo(() => {
        const available = giftCards.filter(card => card.status === 'active');
        return sortProducts(available, sortBy);
    }, [giftCards, sortBy]);

    const totalCount = availableGiftCards.length;

    const handleAddToCart = (item: GiftCardItemType) => {
        setAddedItem(item);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), CART_MESSAGE_TIMEOUT);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value as SortOption);
    };


    console.log(giftCards)
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
                            <AddToCartMessage itemTitle={addedItem.productName} />
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
                            {availableGiftCards.map(card => (
                                <GiftCardItem key={card._id} giftCard={card} onAddToCart={handleAddToCart} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftCard;
