import type { ChangeEvent, FC, MouseEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';
import type { ApiResponse } from '../../Services/api';
import type { CatalogCategory } from '../../Services/ProductRelatedServices';
import { sortProducts, type SortOption } from '../../utils/sortProducts';
import { CART_MESSAGE_TIMEOUT, PRODUCT_SORT_OPTIONS } from '../../utils/constants';
import { getProductPricing } from '../../utils/productPricing';
import AddToCartMessage from '../AddToCartMessage/AddToCartMessage';
import CategorySidebar, { CATEGORY_PARAM } from '../CategorySidebar/CategorySidebar';
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
    fetchItems: (page: number, itemPerPage: number, sortBy: string, category?: string) => Promise<ApiResponse>;
    /** Categories shown in the sidebar (those that contain items of this listing) */
    fetchCategories: () => Promise<ApiResponse<CatalogCategory[]>>;
    /** Sidebar entry that shows every item, e.g. "All Products" */
    allCategoriesLabel: string;
    itemPerPage: number;
    fallbackImage: string;
}

interface CatalogPagination {
    total: number;
    page: number;
    limit: number;
    pages: number;
}

/** WooCommerce's result count text, e.g. "Showing 1–15 of 78 results" */
const resultCountText = ({ total, page, limit }: CatalogPagination): string => {
    if (total === 1) return 'Showing the single result';
    if (total <= limit) return `Showing all ${total} results`;

    const first = (page - 1) * limit + 1;
    const last = Math.min(total, page * limit);
    return `Showing ${first}–${last} of ${total} results`;
};

/** Paged, sortable product grid with a category sidebar, shared by the Shop and Gift Card pages */
const ProductCatalog: FC<ProductCatalogProps> = ({
    source,
    fetchItems,
    fetchCategories,
    allCategoriesLabel,
    itemPerPage,
    fallbackImage,
}) => {
    const [searchParams] = useSearchParams();
    // Selected category id from the URL (?category=...), null for all items
    const category = searchParams.get(CATEGORY_PARAM) || null;

    const [items, setItems] = useState<CatalogItem[]>([]);
    const [sortBy, setSortBy] = useState<SortOption>('menu_order');
    const [addedItem, setAddedItem] = useState<CatalogItem | null>(null);
    const [showMessage, setShowMessage] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [loadError, setLoadError] = useState('');
    // The page number belongs to one category: choosing another starts again at page 1
    const [paging, setPaging] = useState({ category, page: 1 });
    const page = paging.category === category ? paging.page : 1;
    const setPage = (nextPage: number) => setPaging({ category, page: nextPage });
    const [pagination, setPagination] = useState<CatalogPagination>({
        total: 0,
        page: 1,
        limit: itemPerPage,
        pages: 1
    });

    useEffect(() => {
        // Ignore responses that arrive after a newer request (e.g. quick category clicks)
        let ignore = false;

        const loadItems = async () => {
            try {
                const response = await fetchItems(page, itemPerPage, sortBy, category ?? undefined);
                if (ignore) return;

                if (!response.success) {
                    setItems([]);
                    setPagination({ total: 0, page: 1, limit: itemPerPage, pages: 0 });
                    setLoadError(response.message || 'Failed to load products');
                    return;
                }

                setItems(response.data ?? []);
                setPagination(response.pagination ?? { total: response.data?.length ?? 0, page, limit: itemPerPage, pages: 1 });
                setLoadError('');
            } catch (err) {
                console.error(err);
            } finally {
                if (!ignore) setLoaded(true);
            }
        };
        loadItems();

        return () => {
            ignore = true;
        };
    }, [fetchItems, page, itemPerPage, sortBy, category]);

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
                    <CategorySidebar
                        fetchCategories={fetchCategories}
                        selectedId={category}
                        allLabel={allCategoriesLabel}
                    />
                </div>
                <div className="col-md-9">
                    <div className="shop">

                        {showMessage && addedItem && (
                            <AddToCartMessage itemTitle={addedItem.productName} />
                        )}

                        {loaded && pagination.total > 0 && (
                            <>
                                <p className="woocommerce-result-count">
                                    {resultCountText(pagination)}
                                </p>

                                <form className="woocommerce-ordering" method="get" onSubmit={e => e.preventDefault()}>
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
                            </>
                        )}

                        {loaded && pagination.total === 0 && (
                            <p className="woocommerce-info" role="status">
                                {loadError || 'No products were found matching your selection.'}
                            </p>
                        )}

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
