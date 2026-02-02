import { useNavigate, useParams } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ImageNotFound from '../../assets/productImageNotFound.png'
import InnerImageZoom from 'react-inner-image-zoom';
// import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

// @ts-ignore
import { giftCardMockData } from '../../mockData/giftCardMockData';


const GiftCardDetails = () => {
    const navigate = useNavigate();
    const { itemName } = useParams<{ itemName: string }>();

    // Format the gift card name for display
    const formatGiftCardName = (name: string | undefined) => {
        if (!name) return 'Gift Card';
        // Convert 'gift-card-100-00' to 'Gift Card – $100.00'
        const price = name.replace('gift-card-', '').replace('-', '.');
        return `Gift Card – $${price}`;
    };

    // Extract price from route parameter
    const getPrice = (name: string | undefined) => {
        if (!name) return '0.00';
        return name.replace('gift-card-', '').replace('-', '.');
    };

    // Get current product data from giftCardMockData
    const getCurrentProduct = () => {
        return giftCardMockData.find((product: any) => product.slug === itemName);
    };

    // Check if current product is first or last
    const getCurrentProductIndex = () => {
        const index = giftCardMockData.findIndex((product: any) => product.slug === itemName);
        return index !== -1 ? index : 0; // Return 0 if not found to avoid -1 issues
    };

    const currentIndex = getCurrentProductIndex();
    const isFirstProduct = currentIndex === 0;
    const isLastProduct = currentIndex === giftCardMockData.length - 1;
    const currentProduct = getCurrentProduct();

    // Related products data
    const relatedProducts = [
        {
            id: 1,
            slug: 'gift-card-400-00',
            title: 'Gift Card – $400.00',
            price: '400.00',
            image: 'https://spaalita.ca/wp-content/uploads/woocommerce-placeholder-180x180.png',
            srcSet: 'https://spaalita.ca/wp-content/uploads/woocommerce-placeholder-180x180.png 180w, https://spaalita.ca/wp-content/uploads/woocommerce-placeholder-100x100.png 100w, https://spaalita.ca/wp-content/uploads/woocommerce-placeholder-600x600.png 600w, https://spaalita.ca/wp-content/uploads/woocommerce-placeholder-300x300.png 300w, https://spaalita.ca/wp-content/uploads/woocommerce-placeholder-1024x1024.png 1024w, https://spaalita.ca/wp-content/uploads/woocommerce-placeholder-150x150.png 150w, https://spaalita.ca/wp-content/uploads/woocommerce-placeholder-768x768.png 768w, https://spaalita.ca/wp-content/uploads/woocommerce-placeholder.png 1200w',
            alt: 'Placeholder'
        },
        {
            id: 2,
            slug: 'gift-card-300-00',
            title: 'Gift Card – $300.00',
            price: '300.00',
            image: 'https://spaalita.ca/wp-content/uploads/woocommerce-placeholder-180x180.png',
            srcSet: 'https://spaalita.ca/wp-content/uploads/woocommerce-placeholder-180x180.png 180w, https://spaalita.ca/wp-content/uploads/woocommerce-placeholder-100x100.png 100w, https://spaalita.ca/wp-content/uploads/woocommerce-placeholder-600x600.png 600w, https://spaalita.ca/wp-content/uploads/woocommerce-placeholder-300x300.png 300w, https://spaalita.ca/wp-content/uploads/woocommerce-placeholder-1024x1024.png 1024w, https://spaalita.ca/wp-content/uploads/woocommerce-placeholder-150x150.png 150w, https://spaalita.ca/wp-content/uploads/woocommerce-placeholder-768x768.png 768w, https://spaalita.ca/wp-content/uploads/woocommerce-placeholder.png 1200w',
            alt: 'Placeholder'
        },
        {
            id: 3,
            slug: 'gift-card-150-00',
            title: 'Gift Card – $150.00',
            price: '150.00',
            image: 'https://spaalita.ca/wp-content/uploads/2021/06/ezgif.com-gif-maker-2-180x180.jpg',
            srcSet: 'https://spaalita.ca/wp-content/uploads/2021/06/ezgif.com-gif-maker-2-180x180.jpg 180w, https://spaalita.ca/wp-content/uploads/2021/06/ezgif.com-gif-maker-2-150x150.jpg 150w, https://spaalita.ca/wp-content/uploads/2021/06/ezgif.com-gif-maker-2-100x100.jpg 100w',
            alt: 'Gift Card - $150.00'
        },
        {
            id: 4,
            slug: 'gift-card-200-00',
            title: 'Gift Card – $200.00',
            price: '200.00',
            image: 'https://spaalita.ca/wp-content/uploads/2021/06/ezgif.com-gif-maker-3-180x180.jpg',
            srcSet: 'https://spaalita.ca/wp-content/uploads/2021/06/ezgif.com-gif-maker-3-180x180.jpg 180w, https://spaalita.ca/wp-content/uploads/2021/06/ezgif.com-gif-maker-3-150x150.jpg 150w, https://spaalita.ca/wp-content/uploads/2021/06/ezgif.com-gif-maker-3-100x100.jpg 100w',
            alt: 'Gift Card - $200.00'
        }
    ];

    const handleShopClick = () => {
        navigate('/');
    };

    const handleGiftCardClick = () => {
        navigate('/giftcard');
    };

    const handleProductClick = (productName: string) => {
        navigate(`/product/${productName}`);
    };

    // Navigate to previous/next product in all gift card products
    const handlePreviousProduct = () => {
        if (currentIndex > 0) {
            const previousProduct = giftCardMockData[currentIndex - 1];
            window.location.href = `/product/${previousProduct.slug}`;
        } else {
            // If at first product, go to last product
            const lastProduct = giftCardMockData[giftCardMockData.length - 1];
            window.location.href = `/product/${lastProduct.slug}`;
        }
    };

    const handleNextProduct = () => {
        if (currentIndex < giftCardMockData.length - 1) {
            const nextProduct = giftCardMockData[currentIndex + 1];
            window.location.href = `/product/${nextProduct.slug}`;
        } else {
            // If at last product, go to first product
            const firstProduct = giftCardMockData[0];
            window.location.href = `/product/${firstProduct.slug}`;
        }
    };
    console.log("currentProduct", currentProduct);
    return (
        <div className="container py-5">
            <nav className="woocommerce-breadcrumb" aria-label="Breadcrumb">
                <span onClick={handleShopClick} style={{ cursor: 'pointer' }}>Shop</span>&nbsp;/&nbsp;
                <span onClick={handleGiftCardClick} style={{ cursor: 'pointer',}}>Gift Card</span>&nbsp;/&nbsp;
                {formatGiftCardName(itemName)}
            </nav>

            <div className="woocommerce-notices-wrapper"></div>
            <div id="product-273" className="product product-detail">
                <div className="row mt-5">
                    <div className="col-lg-7 col-md-12">

                        <div className="woocommerce-product-gallery">
                            <div className="woocommerce-product-gallery__image">
                                <div className="main-product-image mb-3">
                                    <img 
                                  src={currentProduct?.image?.src}
                                  height={612}
                                  width={459}
                                  />
                                    {/* <InnerImageZoom
                                        src={currentProduct?.image?.src}
                                        zoomType="hover"
                                        zoomPreload={true}

                                        width={459}
                                        height={612}
                                    /> */}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <div className="summary entry-summary">
                            <div className="mb-4 previous-next-product" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                {!isFirstProduct ? (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <KeyboardBackspaceIcon
                                            onClick={handlePreviousProduct}
                                            style={{
                                                fontSize: '18px',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                                {!isLastProduct ? (
                                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                                        <ArrowRightAltIcon
                                            onClick={handleNextProduct}
                                            style={{
                                                fontSize: '18px',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                            <h4 className="product_title entry-title">{formatGiftCardName(itemName)}</h4>
                            <div className="product_meta my-3">
                            </div>
                            <div className="woocommerce-product-details__short-description">
                                <p>Purchase one of our gift cards securely online and we will send the gift card&nbsp;directly to you or your loved one!</p>
                            </div>
                            <p className="price"><span className="woocommerce-Price-amount amount"><bdi><span className="woocommerce-Price-currencySymbol">$</span>{getPrice(itemName)}</bdi></span></p>


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
            <div className="row mt-5">
                <div className="col-md-12">

                    <section className="related products">

                        <h2>Related products</h2>

                        <ul className="products columns-4">
                            {relatedProducts.map((product) => (
                                <li key={product.id} className="col-lg-3 col-md-6 col-sm-6 text-center">
                                    <div style={{ cursor: 'pointer' }} onClick={() => handleProductClick(product.slug)}>
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
                                    <div className="product-title" style={{ cursor: 'pointer' }} onClick={() => handleProductClick(product.slug)}>
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

export default GiftCardDetails;