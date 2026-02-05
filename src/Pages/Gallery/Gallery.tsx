import { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
// import 'react-image-gallery/styles/css/image-gallery.css';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import './Gallery.css';

// Import all gallery images
import Gallery1 from '../../assets/images/gallery1.jpg';
import Gallery2 from '../../assets/images/gallery2.jpg';
import Gallery3 from '../../assets/images/gallery3.jpeg';
import Gallery4 from '../../assets/images/gallery4.jpeg';
import Gallery5 from '../../assets/images/gallery5.jpeg';
import Gallery6 from '../../assets/images/gallery6.jpg';
import Gallery7 from '../../assets/images/gallery7.jpeg';
import Gallery8 from '../../assets/images/gallery8.jpeg';
import Gallery9 from '../../assets/images/gallery9.jpeg';
import Gallery10 from '../../assets/images/gallery10.jpeg';


const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const galleryImages = [
            {
                original: Gallery1,
                originalAlt: 'Spa A\'lita Home Banner',
            },
            {
                original: Gallery2,
                originalAlt: 'Spa A\'lita Home Banner',
            },
            {
                original: Gallery3,
                originalAlt: 'Spa A\'lita Home Banner',
            },
            {
                original: Gallery4,
                originalAlt: 'Spa A\'lita Home Banner',
            },
            {
                original: Gallery5,
                originalAlt: 'Spa A\'lita Home Banner',
            },
            {
                original: Gallery6,
                originalAlt: 'Spa A\'lita Home Banner',
            },
            {
                original: Gallery7,
                originalAlt: 'Spa A\'lita Home Banner',
            },
            {
                original: Gallery8,
                originalAlt: 'Spa A\'lita Home Banner',
            },
            {
                original: Gallery9,
                originalAlt: 'Spa A\'lita Home Banner',
            },
            {
                original: Gallery10,
                originalAlt: 'Spa A\'lita Home Banner',
            },


        ];

        setImages(galleryImages);
        setLoading(false);
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
                        <ArrowBackIosIcon  className="ArrowLeftIcon" onClick={onClick} />
                    )}
                    renderRightNav={(onClick, _disabled) => (
                        <ArrowForwardIosIcon className="ArrowRightIcon"  onClick={onClick} />
                    )}

                    renderFullscreenButton={(onClick) => (
                        <OpenInFullIcon className='fullScreenButton' onClick={onClick} />
                    )}
                    // showFullscreenButton={true}
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
