import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getAllGallery } from '../../Services/GalleryServices';
import './Gallery.css';


const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchGalleryItem = async () => {
        try {
            setLoading(true);
            const response = await getAllGallery();
            console.log(response);

            if (response.success && response.data) {
                // Map API data to gallery format
                const galleryImages = response.data.map((item: any) => ({
                    original: item.url ? item.url : '',
                    originalAlt: 'Spa A\'lita Home Banner',
                }));

                setImages(galleryImages);
            }
        } catch (err: any) {
            console.warn(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGalleryItem();
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
                    renderLeftNav={(onClick, _disabled) => (
                        <ArrowBackIosIcon className="ArrowLeftIcon" onClick={onClick} />
                    )}
                    renderRightNav={(onClick, _disabled) => (
                        <ArrowForwardIosIcon className="ArrowRightIcon" onClick={onClick} />
                    )}
                    renderFullscreenButton={(onClick, isFullscreen) => (
                        <OpenInFullIcon className="fullScreenButton" onClick={onClick} isFullscreen={isFullscreen} />
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