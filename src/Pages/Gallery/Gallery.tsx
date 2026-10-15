import { useState, useEffect } from 'react';
import type { MouseEventHandler } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getAllGallery } from '../../Services/GalleryServices';
import './Gallery.css';

interface GalleryImage {
    original: string;
    originalAlt: string;
}

type NavHandler = MouseEventHandler<SVGSVGElement>;

const Gallery = () => {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGalleryItems = async () => {
            try {
                const response = await getAllGallery();

                if (response.success && response.data) {
                    setImages(response.data.map((item: { url?: string }) => ({
                        original: item.url || '',
                        originalAlt: 'Spa A\'lita Home Banner',
                    })));
                }
            } catch (err) {
                console.warn(err);
            } finally {
                setLoading(false);
            }
        };
        fetchGalleryItems();
    }, []);

    if (loading) {
        return (
            <div className="container">
                <div className="loading-spinner text-center py-5">
                    <p>Loading gallery...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid gallery-container" id="gallery-section">
            <div className="image-gallery-wrapper sliders mb-5">
                <ImageGallery
                    items={images}
                    showBullets={true}
                    showIndex={false}
                    showThumbnails={false}
                    lazyLoad={true}
                    thumbnailPosition="bottom"
                    showPlayButton={false}
                    renderLeftNav={(onClick: NavHandler) => (
                        <ArrowBackIosIcon className="ArrowLeftIcon" onClick={onClick} />
                    )}
                    renderRightNav={(onClick: NavHandler) => (
                        <ArrowForwardIosIcon className="ArrowRightIcon" onClick={onClick} />
                    )}
                    renderFullscreenButton={(onClick: NavHandler) => (
                        <OpenInFullIcon className="fullScreenButton" onClick={onClick} />
                    )}
                    useBrowserFullscreen={true}
                    autoPlay={false}
                    slideInterval={4000}
                    slideDuration={450}
                    swipeThreshold={50}
                    showNav={true}
                    indexSeparator=" of "
                    additionalClass="custom-image-gallery"
                />
            </div>
        </div>
    );
};

export default Gallery;
