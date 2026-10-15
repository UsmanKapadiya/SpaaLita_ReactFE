import type { ChangeEvent, FC, MouseEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';
import type { ApiResponse } from '../../Services/api';
import { sortProducts, type SortOption } from '../../utils/sortProducts';
import { CART_MESSAGE_TIMEOUT, PRODUCT_SORT_OPTIONS } from '../../utils/constants';
import { getProductPricing } from '../../utils/productPricing';
import AddToCartMessage from '../AddToCartMessage/AddToCartMessage';
import Pagination from '../Pagination/Pagination';

/** Which listing a product was opened from; ProductDetails uses it to pick the API */
export type ProductSource = 'shop' | 'giftCard';

export interface CatalogItem {
    _id: string;
    productName: string;
    status: string;
    price?: number | string;
    regular_price?: number | string;
    sale_price?: number | string;
    productImages?: string[];
}

interface CatalogItemCardProps {
    item: CatalogItem;
    allProducts: CatalogItem[];
    source: ProductSource;
    fallbackImage: string;
    onAddToCart: (item: CatalogItem) => void;
}

const CatalogItemCard: FC<CatalogItemCardProps> = ({ item, allProducts, source, fallbackImage, onAddToCart }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // productImages are already full URLs (resolved in ProductRelatedServices)
    const imageUrl = item.productImages?.[0] || fallbackImage;
    const { salePrice, regularPrice, price } = getProductPricing(item);

    const handleAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(addToCart({
            id: item._id,
            name: item.productName,
            price,
            image: imageUrl
        }));
        onAddToCart(item);
    };

    const handleProductClick = () => {
        navigate(`/product/${item._id}`, {
            state: { source, allProducts, currentProduct: item }
        });
    };

    return (
        <li className="col-lg-4 col-md-6 col-sm-6 text-center">
            <div onClick={handleProductClick} className="clickable">
                <img
                    src={imageUrl}
                    alt={item.productName}
                    className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                    style={{
                        width: '180px',
                        height: '180px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        display: 'block',
                        margin: '0 auto',
                    }}
                />
            </div>
            <div className="product-title clickable" onClick={handleProductClick}>
                {item.productName}
            </div>
            <span className="price">
                {salePrice > 0 ? (
                    <>
                        <bdi className="sale-price">
                            ${salePrice.toFixed(2)}
                        </bdi>
                        <span className="regular-price">
                            ${regularPrice.toFixed(2)}
                        </span>
                    </>
                ) : (
                    <bdi>${regularPrice.toFixed(2)}</bdi>
                )}
            </span>
            <button className="d-block add-to-cart add-to-cart-button" onClick={handleAddToCart}>
                Add to cart
            </button>
        </li>
    );
};

interface ProductCatalogProps {
    source: ProductSource;
    fetchItems: (page: number, itemPerPage: number, sortBy: string) => Promise<ApiResponse>;
    itemPerPage: number;
    fallbackImage: string;
}

/** Paged, sortable product grid shared by the Shop and Gift Card pages */
const ProductCatalog: FC<ProductCatalogProps> = ({ source, fetchItems, itemPerPage, fallbackImage }) => {
    const [items, setItems] = useState<CatalogItem[]>([]);
    const [sortBy, setSortBy] = useState<SortOption>('menu_order');
    const [addedItem, setAddedItem] = useState<CatalogItem | null>(null);
    const [showMessage, setShowMessage] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 9,
        pages: 1
    });

    useEffect(() => {
        const loadItems = async () => {
            try {
                const response = await fetchItems(page, itemPerPage, sortBy);
                if (!response.success || !response.data?.length) return;

                setItems(response.data);
                if (response.pagination) setPagination(response.pagination);
            } catch (err) {
                console.error(err);
            }
        };
        loadItems();
    }, [fetchItems, page, itemPerPage, sortBy]);

    const availableItems = useMemo(() => {
        const available = items.filter(item => item.status === 'active');
        return sortProducts(available, sortBy);
    }, [items, sortBy]);

    const handleAddToCart = (item: CatalogItem) => {
        setAddedItem(item);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), CART_MESSAGE_TIMEOUT);
    };

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value as SortOption);
        setPage(1);
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
                            <AddToCartMessage itemTitle={addedItem.productName} />
                        )}

                        <p className="woocommerce-result-count">
                            Showing all {availableItems.length} results
                        </p>

                        <form className="woocommerce-ordering" method="get">
                            <span className="pl-2">Sort By:</span>
                            <select
                                name="orderby"
                                className="orderby"
                                value={sortBy}
                                onChange={handleSortChange}
                            >
                                {PRODUCT_SORT_OPTIONS.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </form>

                        <div className="clear"></div>

                        <ul className="products columns-3">
                            {availableItems.map(item => (
                                <CatalogItemCard
                                    key={item._id}
                                    item={item}
                                    allProducts={availableItems}
                                    source={source}
                                    fallbackImage={fallbackImage}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                        </ul>

                        <div style={{ clear: "both" }}></div>

                        {pagination.pages > 1 && (
                            <Pagination
                                currentPage={pagination.page}
                                totalPages={pagination.pages}
                                onPageChange={setPage}
                            />
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCatalog;
