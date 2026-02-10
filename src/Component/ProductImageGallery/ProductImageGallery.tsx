import type { FC } from 'react';
import ImageNotFound from '../../assets/images/productImageNotFound.png';

interface ImageData {
    src: string;
    alt: string;
}

interface ProductImageGalleryProps {
    mainImage: ImageData | null;
    thumbnailImages: ImageData[];
    selectedImageIndex: number;
    onImageSelect: (index: number) => void;
}

const ProductImageGallery: FC<ProductImageGalleryProps> = ({
    mainImage,
    thumbnailImages,
    selectedImageIndex,
    onImageSelect
}) => {
    return (
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
                {thumbnailImages.length > 1 && (
                    <div 
                        className="product-thumbnails d-flex gap-2 mt-3" 
                        style={{ flexWrap: 'wrap' }}
                    >
                        {thumbnailImages.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => onImageSelect(index)}
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
    );
};

export default ProductImageGallery;
