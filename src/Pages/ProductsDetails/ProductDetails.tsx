//@ts-nocheck
import type { FC } from 'react';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ImageNotFound from '../../assets/images/productImageNotFound.png';
import ProductNavigation from '../../Component/ProductNavigation/ProductNavigation';
import ProductImageGallery from '../../Component/ProductImageGallery/ProductImageGallery';
import RelatedProducts from '../../Component/RelatedProducts/RelatedProducts';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';
import { getRelatedProducts, getGiftCardRelatedProducts } from '../../Services/ProductRelatedServices'
import '../../Component/AddToCartMessage/AddToCartMessage.css';

interface Product {
    _id: string;
    productName: string;
    description?: string;
    price: number;
    currency?: string;
    qty: number;
    category?: string;
    images?: { src: string }[];
    image?: { src: string };
}

interface RelatedProduct {
    id: string;
    slug: string;
    productName: string;
    price: number | string;
    image: string;
    alt: string;
    category?: string;
}

type ProductSource = "shop" | "giftCard";

interface LocationState {
    source?: ProductSource;
    allProducts?: Product[];
    currentProduct?: Product;
}
const ProductDetails: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { itemName } = useParams<{ itemName: string }>(); //id Get here
    const sourceFromState = (location.state as LocationState)?.source;
    const AllProducts = (location.state as LocationState)?.allProducts;
    const currentProduct = (location.state as LocationState)?.currentProduct;
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([])



    const fetchRelatedProducts = async () => {
        if (!itemName) return; // important: prevent API call with undefined

        try {
            setLoading(true);
            setError("");

            let response;
            if (sourceFromState === 'shop') {
                response = await getRelatedProducts(itemName);
            } else {
                response = await getGiftCardRelatedProducts(itemName);
            }

            if (!response.success || !response.data?.length) {
                throw new Error("No related products found.");
            }
            const formattedProducts = response.data.map((item: any) => ({
                id: item._id,
                slug: item._id,
                productName: item.productName,
                price: item.price,
                image: item.productImages?.[0]?.src || ImageNotFound,
                alt: item.productName,
                category: item.category

            }));

            setRelatedProducts(formattedProducts);

        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load related products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!itemName) return;
        fetchRelatedProducts();
    }, [sourceFromState, itemName]);

    const currentDataArray = AllProducts
    const currentIndex = useMemo(() =>
        currentDataArray.findIndex((product: any) => product._id === itemName),
        [currentDataArray, itemName]
    );

    const isFirstProduct = currentIndex === 0;
    const isLastProduct = currentIndex === currentDataArray.length - 1;

    const handleShopClick = useCallback(() => {
        navigate('/shop');
    }, [navigate]);


    const handleProductClick = useCallback((product: any) => {
        navigate(`/product/${product.id}`, {
            state: {
                source: sourceFromState,
                allProducts: AllProducts,
                currentProduct: product
            }
        });


    }, [navigate, sourceFromState, AllProducts]);

    const navigateToProduct = useCallback((product: any) => {
        navigate(`/product/${product._id}`, {
            state: { source: sourceFromState, allProducts: AllProducts, currentProduct: product }
        });
        setSelectedImageIndex(0);
    }, [navigate, sourceFromState]);

    const handlePreviousProduct = useCallback(() => {
        const product = currentIndex > 0
            ? currentDataArray[currentIndex - 1]
            : currentDataArray[currentDataArray.length - 1];
        navigateToProduct(product);
    }, [currentIndex, currentDataArray, navigateToProduct]);

    const handleNextProduct = useCallback(() => {
        const product = currentIndex < currentDataArray.length - 1
            ? currentDataArray[currentIndex + 1]
            : currentDataArray[0];
        navigateToProduct(product);
    }, [currentIndex, currentDataArray, navigateToProduct]);

    const addProductToCart = useCallback(
        (product: Product, qty: number) => {
            dispatch(
                addToCart({
                    id: product._id?.toString() || '',
                    name: product.productName,
                    price: product.price,
                    quantity: qty,
                    image:
                        product.images?.[0]?.src ||
                        product.image?.src ||
                        ImageNotFound,
                })
            );

            setIsAddedToCart(true);
        },
        [dispatch]
    );

    const handleRelatedAddToCart = useCallback(
        (product: RelatedProduct) => {
            addProductToCart(
                {
                    _id: product.id,
                    productName: product.productName,
                    price: Number(product.price),
                    images: [{ src: product.image }],
                } as any,
                1
            );
        },
        [addProductToCart]
    );

    const handleFormSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!currentProduct) return;

            addProductToCart(currentProduct, quantity);
        },
        [currentProduct, quantity, addProductToCart]
    );


    const handleViewCart = useCallback(() => {
        navigate('/cart');
    }, [navigate]);

    useEffect(() => {
        setIsAddedToCart(false);
    }, [itemName]);

    const handleChange = (e) => {
        let value = parseInt(e.target.value, 10);

        if (value > currentProduct.qty) {
            value = currentProduct.qty;
        }

        if (value < 1 || isNaN(value)) {
            value = 1;
        }

        setQuantity(value);
    };



    const mainImage = currentProduct?.images?.[selectedImageIndex] || currentProduct?.image || null;
    const thumbnailImages = currentProduct?.images || [];
    const isGiftCard = sourceFromState === 'giftCard' || currentProduct?.title?.toLowerCase().includes('gift card');

    return (
        <div className="container py-5">
            <nav className="woocommerce-breadcrumb" aria-label="Breadcrumb">
                <span onClick={handleShopClick} style={{ cursor: 'pointer' }}>Shop</span>&nbsp;/&nbsp;
                {isGiftCard && (
                    <>
                        <span onClick={() => navigate('/giftcard')} style={{ cursor: 'pointer' }}>Gift Card</span>&nbsp;/&nbsp;
                    </>
                )}
                <span>{currentProduct?.category}</span> / <span>{currentProduct?.productName}</span>
            </nav>

            <div className="woocommerce-notices-wrapper"></div>
            <div id="product-273" className="product product-detail">
                <div className="row mt-5">
                    <div className="col-lg-7 col-md-12">
                        <ProductImageGallery
                            mainImage={mainImage}
                            thumbnailImages={thumbnailImages}
                            selectedImageIndex={selectedImageIndex}
                            onImageSelect={setSelectedImageIndex}
                        />
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <div className="summary entry-summary">
                            <ProductNavigation
                                isFirstProduct={isFirstProduct}
                                isLastProduct={isLastProduct}
                                onPrevious={handlePreviousProduct}
                                onNext={handleNextProduct}
                            />
                            <h4 className="product_title entry-title">{currentProduct?.productName}</h4>
                            <div className="woocommerce-product-details__short-description">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: currentProduct?.description || 'Purchase one of our products securely online and we will send it directly to you or your loved one!'
                                            .replace(/&lt;/g, '<')
                                            .replace(/&gt;/g, '>')
                                            .replace(/&amp;/g, '&')
                                            .replace(/&nbsp;/g, ' ')
                                    }}
                                />
                            </div>
                            <p className="price"><span className="woocommerce-Price-amount amount"><bdi><span className="woocommerce-Price-currencySymbol">{currentProduct?.currency || '$'}</span>{currentProduct?.price?.toFixed(2)}</bdi></span></p>


                            <form className="cart" onSubmit={handleFormSubmit} method="post" encType="multipart/form-data" id="fpf-add-to-cart-form">
                                <div className="fpf-fields before-add-to-cart">
                                    <input type="hidden" name="_fpf_nonce" value="68f4b39d79" form="fpf-add-to-cart-form" />
                                    <input type="hidden" name="_fpf_product_id" value="273" form="fpf-add-to-cart-form" />
                                    <div className="fpf-field fpf-textarea">
                                        <p className="form-row " id="fpf_3214519_field" data-priority=""><label htmlFor="fpf_3214519" className="">A message to the gift card recipient&nbsp;<span className="optional">(optional)</span></label><span className="woocommerce-input-wrapper"><textarea name="fpf_3214519" className="input-text fpf-input-field" id="fpf_3214519" placeholder="500" rows={2} cols={5} maxLength={500} form="fpf-add-to-cart-form"></textarea></span></p></div>
                                    <div className="fpf-totals">
                                        <dl id="fpf_totals"></dl>
                                    </div>
                                </div>

                                <div className="qty">Qty</div>
                                <div className="quantity">
                                    <input
                                        type="number"
                                        className="input-text qty text"
                                        value={quantity}
                                        min="1"
                                        max={currentProduct.qty}
                                        step="1"
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="mt-5" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <button type="submit" name="add-to-cart" value="273" className="single_add_to_cart_button button alt">
                                        Add to cart
                                    </button>
                                    {isAddedToCart && (
                                        <span

                                            onClick={handleViewCart}
                                            className="single_add_to_cart_button  alt"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            View Cart
                                        </span>
                                    )}
                                </div>

                                <div className="fpf-fields after-add-to-cart fpf-clear">
                                </div>
                            </form>

                            <div id="wc-stripe-express-checkout-element" style={{ marginTop: '1em', clear: 'both' }}>
                                {/* A Stripe Element will be inserted here. */}
                                <div id="wc-stripe-express-checkout-element-link" className="StripeElement"><div className="__PrivateStripeElement" style={{ margin: '-4px 0px', padding: '0px', border: 'none', display: 'block', background: 'transparent', position: 'relative', opacity: 1, transition: 'height 0.35s' }}><iframe name="__privateStripeFrame7673" frameBorder={0} allowTransparency={true} scrolling="no" role="presentation" allow="payment *" src="https://js.stripe.com/v3/elements-inner-accessory-target-b3679e3307e921d01de4b275d2b56b66.html#__shared_params__[version]=v3&__shared_params__[light_experiment_assignments]=%7B%22token%22%3A%225ccc9d2d-3810-4875-9fb6-f80c0e26b7be%22%2C%22assignments%22%3A%7B%22elements_accessory_frame_rendering_v5%22%3A%22treatment%22%2C%22elements_generic_skeleton_loader_v2%22%3A%22control%22%7D%7D&wait=false&rtl=false&publicOptions[buttonHeight]=48&publicOptions[layout][maxColumns]=0&publicOptions[layout][maxRows]=0&publicOptions[layout][overflow]=never&publicOptions[buttonTheme][applePay]=black&publicOptions[buttonTheme][googlePay]=black&publicOptions[buttonType][applePay]=buy&publicOptions[buttonType][googlePay]=buy&publicOptions[paymentMethods][applePay]=never&publicOptions[paymentMethods][googlePay]=never&publicOptions[paymentMethods][link]=auto&publicOptions[paymentMethods][amazonPay]=never&elementsInitSource=stripe.elements&elementId=expressCheckout-5417f89e-89ff-46b6-9cf8-91597b223008&componentName=expressCheckout&keyMode=live&apiKey=pk_live_51FdWyqHp9OLq5NYnNWSz9B66rFGc9RHn12KjVhLJgkO1xAkNFnxjnewD88oXyeKOKW4oJHBgxSfmtJy6lCqClicG00GJlf5BEm&frameMessagingStrategy=direct&accessoryCssUrl=https%3A%2F%2Fjs.stripe.com%2Fv3%2Ffingerprinted%2Fcss%2Felements-inner-express-checkout-875964149427de812d55c26dc3079bfc.css&referrer=https%3A%2F%2Fspaalita.ca%2Fproduct%2Fgift-card-100-00%2F&controllerId=__privateStripeController7671" title="Secure express checkout frame" style={{ border: '0px', margin: '-4px', padding: '0px', width: 'calc(100% + 8px)', minWidth: '100%', overflow: 'hidden', display: 'block', userSelect: 'none', transform: 'translate(0px)', colorScheme: 'light', height: '56px', transition: 'height 0.35s, opacity 0.4s 0.1s' }}></iframe></div></div></div>
                            <div id="wc-stripe-express-checkout__order-attribution-inputs" style={{ display: 'none' }}><input type="hidden" name="wc_order_attribution_source_type" value="referral" /><input type="hidden" name="wc_order_attribution_referrer" value="http://localhost:5173/" /><input type="hidden" name="wc_order_attribution_utm_campaign" value="(none)" /><input type="hidden" name="wc_order_attribution_utm_source" value="localhost" /><input type="hidden" name="wc_order_attribution_utm_medium" value="referral" /><input type="hidden" name="wc_order_attribution_utm_content" value="/" /><input type="hidden" name="wc_order_attribution_utm_id" value="(none)" /><input type="hidden" name="wc_order_attribution_utm_term" value="(none)" /><input type="hidden" name="wc_order_attribution_utm_source_platform" value="(none)" /><input type="hidden" name="wc_order_attribution_utm_creative_format" value="(none)" /><input type="hidden" name="wc_order_attribution_utm_marketing_tactic" value="(none)" /><input type="hidden" name="wc_order_attribution_session_entry" value="https://spaalita.ca/product/gift-card-200-00/" /><input type="hidden" name="wc_order_attribution_session_start_time" value="2026-02-02 07:11:40" /><input type="hidden" name="wc_order_attribution_session_pages" value="3" /><input type="hidden" name="wc_order_attribution_session_count" value="3" /><input type="hidden" name="wc_order_attribution_user_agent" value="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36" /></div>
                        </div>
                    </div>
                </div>
            </div>
            {currentProduct?.description && (
                <div className="w-100 my-5 pt-5">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            <button
                                className="nav-link active"
                                id="description-tab"
                                type="button"
                                role="tab"
                                aria-controls="Description"
                                aria-selected="true"
                                style={{ background: 'none', border: 'none' }}
                            >
                                Description
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content pt-3 px-3" id="product-tabs">
                        <div className="tab-pane fade show active" id="content_description" role="tabpanel" aria-labelledby="content_description">
                            <h2>Description</h2>
                            <p>
                                 <div
                                    dangerouslySetInnerHTML={{
                                        __html: currentProduct?.description || 'Purchase one of our products securely online and we will send it directly to you or your loved one!'
                                            .replace(/&lt;/g, '<')
                                            .replace(/&gt;/g, '>')
                                            .replace(/&amp;/g, '&')
                                            .replace(/&nbsp;/g, ' ')
                                    }}
                                />
                                </p>
                        </div>
                    </div>
                </div>
            )}
            <RelatedProducts
                products={relatedProducts}
                onProductClick={handleProductClick}
                // cartClick={handleAddToCart}
                cartClick={handleRelatedAddToCart}

            />

        </div>
    );
};

export default ProductDetails;