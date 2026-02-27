// RelatedProducts.tsx
import type { FC } from 'react';

interface RelatedProduct {
    id: string;          // _id from API
    slug: string;        // can use _id if slug is missing
    productName: string;
    price: number | string;
    image: string;
    srcSet?: string;
    alt: string;
}

interface RelatedProductsProps {
    products: RelatedProduct[];
    onProductClick: (product: RelatedProduct) => void;
    cartClick: (product: RelatedProduct) => void;
}

const ImageNotFound = '/images/not-found.png';

const RelatedProducts: FC<RelatedProductsProps> = ({ products, onProductClick, cartClick }) => {
    if (!products || products.length === 0) return null;

    return (
        <div className="row mt-5">
            <div className="col-md-12">
                <section className="related products">
                    <h2>Related products</h2>
                    <ul className="products columns-4">
                        {products.map((product) => (
                            <li key={product.id} className="col-lg-3 col-md-6 col-sm-6 text-center">
                                <div
                                    className="clickable"
                                    onClick={() => onProductClick(product)}
                                >
                                    <img
                                        width={180}
                                        height={180}
                                        src={product.image || ImageNotFound}
                                        className="wp-post-image"
                                        alt={product.alt || product.productName}
                                        decoding="async"
                                        loading="lazy"
                                        srcSet={product.srcSet || ''}
                                        sizes="(max-width: 180px) 100vw, 180px"
                                    />
                                </div>
                                <div
                                    className="product-title clickable"
                                    onClick={() => onProductClick(product)}
                                >
                                    {product.productName}
                                </div>
                                <span className="price">
                                    <span className="woocommerce-Price-amount amount">
                                        <bdi>
                                            <span className="woocommerce-Price-currencySymbol">$</span>
                                            {typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                                        </bdi>
                                    </span>
                                </span>
                                <button
                                    className="d-block add-to-cart addToCartButton"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        cartClick(product);
                                    }}
                                >
                                    Add to cart
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default RelatedProducts;