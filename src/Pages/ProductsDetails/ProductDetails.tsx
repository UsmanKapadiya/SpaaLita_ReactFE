import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ImageNotFound from '../../assets/images/productImageNotFound.png';
import { shopMockData } from '../../mockData/shopMockData';
import { giftCardMockData } from '../../mockData/giftCardMockData';


const ProductDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { itemName } = useParams();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Get source from location state, or auto-detect if not provided
    const sourceFromState = location.state?.source;

    const getCurrentProduct = () => {
        if (sourceFromState === 'shop') {
            const product = shopMockData.find(product => product.slug === itemName);
            return { product, source: 'shop' };
        } else if (sourceFromState === 'giftCard') {
            const product = giftCardMockData.find(product => product.slug === itemName);
            return { product, source: 'giftCard' };
        }
        
        let product = shopMockData.find(product => product.slug === itemName);
        if (product) return { product, source: 'shop' };
        
        product = giftCardMockData.find(product => product.slug === itemName);
        if (product) return { product, source: 'giftCard' };
        
        return { product: null, source: null };
    };

    const { product: currentProduct, source: productSource } = getCurrentProduct();
    
    const currentDataArray = productSource === 'shop' ? shopMockData : giftCardMockData;

    const currentIndex = currentDataArray.findIndex(product => product.slug === itemName);
    const isFirstProduct = currentIndex === 0;
    const isLastProduct = currentIndex === currentDataArray.length - 1;

    const relatedProducts = currentDataArray
        .filter((product) => product.slug !== itemName)
        .slice(0, 4)
        .map((product) => ({
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price?.toFixed(2) || product.price,
            image: product.images?.[0]?.src || product.image?.src || ImageNotFound,
            srcSet: product.images?.[0]?.srcSet || product.image?.srcSet || '',
            alt: product.images?.[0]?.alt || product.image?.alt || product.title
        }));

    const handleShopClick = () => {
        navigate('/shop');
    };

    const handleProductClick = (productSlug, productId) => {
        navigate(`/product/${productSlug}`, {
            state: { id: productId, source: productSource }
        });
        setSelectedImageIndex(0);
    };

    const navigateToProduct = (product) => {
        navigate(`/product/${product.slug}`, {
            state: { id: product.id, source: productSource }
        });
        setSelectedImageIndex(0);
    };

    const handlePreviousProduct = () => {
        const product = currentIndex > 0 
            ? currentDataArray[currentIndex - 1] 
            : currentDataArray[currentDataArray.length - 1];
        navigateToProduct(product);
    };

    const handleNextProduct = () => {
        const product = currentIndex < currentDataArray.length - 1 
            ? currentDataArray[currentIndex + 1] 
            : currentDataArray[0];
        navigateToProduct(product);
    };

    const mainImage = currentProduct?.images?.[selectedImageIndex] || currentProduct?.image || null;
    const thumbnailImages = currentProduct?.images || [];
    const isGiftCard = productSource === 'giftCard' || currentProduct?.title?.toLowerCase().includes('gift card');

    return (
        <div className="container py-5">
            <nav className="woocommerce-breadcrumb" aria-label="Breadcrumb">
                <span onClick={handleShopClick} style={{ cursor: 'pointer' }}>Shop</span>&nbsp;/&nbsp;
                {isGiftCard && (
                    <>
                        <span onClick={() => navigate('/giftcard')} style={{ cursor: 'pointer' }}>Gift Card</span>&nbsp;/&nbsp;
                    </>
                )}
                {currentProduct?.title || 'Product'}
            </nav>

            <div className="woocommerce-notices-wrapper"></div>
            <div id="product-273" className="product product-detail">
                <div className="row mt-5">
                    <div className="col-lg-7 col-md-12">
                        <div className="woocommerce-product-gallery">
                            <div className="woocommerce-product-gallery__image">
                                <div className="main-product-image mb-3">
                                    {mainImage ? (
                                        <img
                                            src={mainImage.src}
                                            alt={mainImage.alt}
                                            height={612}
                                            width={459}
                                            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                                        />
                                    ) : (
                                        <img
                                            src={ImageNotFound}
                                            alt="Product not found"
                                            height={612}
                                            width={459}
                                        />
                                    )}
                                </div>
                                {/* Thumbnail images */}
                                {thumbnailImages.length > 1 && (
                                    <div className="product-thumbnails d-flex gap-2 mt-3" style={{ flexWrap: 'wrap' }}>
                                        {thumbnailImages.map((image: any, index: number) => (
                                            <div
                                                key={index}
                                                onClick={() => setSelectedImageIndex(index)}
                                                style={{
                                                    cursor: 'pointer',
                                                    border: selectedImageIndex === index ? '2px solid #000' : '1px solid #ddd',
                                                    padding: '5px',
                                                    width: '100px',
                                                    height: '100px'
                                                }}
                                            >
                                                <img
                                                    src={image.src}
                                                    alt={image.alt}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <div className="summary entry-summary">
                            <div className="mb-4 previous-next-product" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                {!isFirstProduct && (
                                    <KeyboardBackspaceIcon
                                        onClick={handlePreviousProduct}
                                        style={{ fontSize: '18px', cursor: 'pointer' }}
                                    />
                                )}
                                {!isLastProduct && (
                                    <ArrowRightAltIcon
                                        onClick={handleNextProduct}
                                        style={{ fontSize: '18px', cursor: 'pointer', marginLeft: 'auto' }}
                                    />
                                )}
                            </div>
                            <h4 className="product_title entry-title">{currentProduct?.title}</h4>
                            <div className="woocommerce-product-details__short-description">
                                <p>{currentProduct?.description || 'Purchase one of our products securely online and we will send it directly to you or your loved one!'}</p>
                            </div>
                            <p className="price"><span className="woocommerce-Price-amount amount"><bdi><span className="woocommerce-Price-currencySymbol">{currentProduct?.currency || '$'}</span>{currentProduct?.price?.toFixed(2)}</bdi></span></p>


                            <form className="cart" onSubmit={(e) => { e.preventDefault(); console.log('Add to cart clicked'); }} method="post" encType="multipart/form-data" id="fpf-add-to-cart-form">
                                <div className="fpf-fields before-add-to-cart">
                                    <input type="hidden" name="_fpf_nonce" value="68f4b39d79" form="fpf-add-to-cart-form" />
                                    <input type="hidden" name="_fpf_product_id" value="273" form="fpf-add-to-cart-form" />
                                    <div className="fpf-field fpf-textarea">
                                        <p className="form-row " id="fpf_3214519_field" data-priority=""><label htmlFor="fpf_3214519" className="">A message to the gift card recipient&nbsp;<span className="optional">(optional)</span></label><span className="woocommerce-input-wrapper"><textarea name="fpf_3214519" className="input-text fpf-input-field" id="fpf_3214519" placeholder="500" rows={2} cols={5} maxLength={500} form="fpf-add-to-cart-form"></textarea></span></p></div>
                                    <div className="fpf-totals">
                                        <dl id="fpf_totals"></dl>
                                    </div>
                                </div>

                                <div className="qty">Qty </div><div className="quantity">
                                    {/* <label className="screen-reader-text" htmlFor="quantity_698057c4e0b2c">Gift Card - $100.00 quantity</label> */}
                                    <input type="number" id="quantity_698057c4e0b2c" className="input-text qty text" name="quantity" defaultValue="1" aria-label="Product quantity" min="1" step="1" placeholder="" inputMode="numeric" autoComplete="off" />
                                </div>

                                <div className="mt-5"><button type="submit" name="add-to-cart" value="273" className="single_add_to_cart_button button alt">Add to cart</button></div>

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
                            <a className="nav-link active" id="description-tab" data-toggle="tab" href="#content_description" role="tab" aria-controls="Description" aria-selected="true">Description</a>
                        </li>
                    </ul>
                    <div className="tab-content pt-3 px-3" id="product-tabs">
                        <div className="tab-pane fade show active" id="content_description" role="tabpanel" aria-labelledby="content_description">
                            <h2>Description</h2>
                            <p>{currentProduct.description}</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="row mt-5">
                <div className="col-md-12">

                    <section className="related products">

                        <h2>Related products</h2>

                        <ul className="products columns-4">
                            {relatedProducts.map((product) => (
                                <li key={product.id} className="col-lg-3 col-md-6 col-sm-6 text-center">
                                    <div style={{ cursor: 'pointer' }} onClick={() => handleProductClick(product.slug, product.id)}>
                                        <img
                                            width="180"
                                            height="180"
                                            src={product.image}
                                            className="wp-post-image"
                                            alt={product.alt}
                                            decoding="async"
                                            loading="lazy"
                                            srcSet={product.srcSet}
                                            sizes="(max-width: 180px) 100vw, 180px"
                                        />
                                    </div>
                                    <div className="product-title" style={{ cursor: 'pointer' }} onClick={() => handleProductClick(product.slug, product.id)}>
                                        {product.title}
                                    </div>
                                    <span className="price">
                                        <span className="woocommerce-Price-amount amount">
                                            <bdi>
                                                <span className="woocommerce-Price-currencySymbol">$</span>
                                                {product.price}
                                            </bdi>
                                        </span>
                                    </span>
                                    <button
                                        className="d-block add-to-cart addToCartButton"
                                        onClick={(e) => { e.preventDefault(); console.log(`Add to cart: $${product.price}`); }}>
                                        Add to cart
                                    </button>
                                </li>
                            ))}
                        </ul>

                    </section>
                </div>
            </div>

        </div>
    );
};

export default ProductDetails;