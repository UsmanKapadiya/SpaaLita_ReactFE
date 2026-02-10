import type { FC } from 'react';
import { useCallback } from 'react';

interface RelatedProduct {
    id: number;
    slug: string;
    title: string;
    price: string | number;
    image: string;
    srcSet?: string;
    alt: string;
}

interface RelatedProductsProps {
    products: RelatedProduct[];
    onProductClick: (slug: string, id: number) => void;
}

const RelatedProducts: FC<RelatedProductsProps> = ({ products, onProductClick }) => {
    if (products.length === 0) {
        return null;
    }

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
                                    onClick={() => onProductClick(product.slug, product.id)}
                                >
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
                                <div 
                                    className="product-title clickable" 
                                    onClick={() => onProductClick(product.slug, product.id)}
                                >
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
                                    onClick={(e) => e.preventDefault()}
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
