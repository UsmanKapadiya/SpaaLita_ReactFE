import type { FC } from 'react';
import { useState, useRef } from 'react';
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
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const imageContainerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        setIsZoomed(true);
    };

    const handleMouseLeave = () => {
        setIsZoomed(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageContainerRef.current) return;

        const rect = imageContainerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setMousePosition({ x, y });
    };

    return (
        <div className="woocommerce-product-gallery">
            <div className="woocommerce-product-gallery__image">
                <div 
                    className="main-product-image mb-3"
                    ref={imageContainerRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    style={{
                        overflow: 'hidden',
                        position: 'relative',
                        cursor: isZoomed ? 'zoom-in' : 'default'
                    }}
                >
                    {mainImage ? (
                        <img
                            src={mainImage.src}
                            alt={mainImage.alt}
                            height={612}
                            width={459}
                            style={{ 
                                width: '100%', 
                                height: 'auto', 
                                objectFit: 'contain',
                                transform: isZoomed ? 'scale(2)' : 'scale(1)',
                                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                                transition: isZoomed ? 'none' : 'transform 0.3s ease',
                            }}
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
