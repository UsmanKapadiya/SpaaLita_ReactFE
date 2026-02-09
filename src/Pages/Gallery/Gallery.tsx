//@ts-nocheck
import { FC, useState, useEffect, useMemo } from 'react';
import ImageGallery from 'react-image-gallery';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
import './Gallery.css';


interface GalleryImage {
  src: string;
  alt: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  { src: Gallery1, alt: 'Spa A\'lita - Relaxing Spa Interior' },
  { src: Gallery2, alt: 'Spa A\'lita - Treatment Room' },
  { src: Gallery3, alt: 'Spa A\'lita - Massage Therapy Area' },
  { src: Gallery4, alt: 'Spa A\'lita - Facial Treatment Space' },
  { src: Gallery5, alt: 'Spa A\'lita - Wellness Center' },
  { src: Gallery6, alt: 'Spa A\'lita - Tranquil Environment' },
  { src: Gallery7, alt: 'Spa A\'lita - Premium Spa Services' },
  { src: Gallery8, alt: 'Spa A\'lita - Luxury Facilities' },
  { src: Gallery9, alt: 'Spa A\'lita - Spa Experience' },
  { src: Gallery10, alt: 'Spa A\'lita - Relaxation Space' },
];

const Gallery: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const images = useMemo(() => {
    return GALLERY_IMAGES.map(({ src, alt }) => ({
      original: src,
      originalAlt: alt,
    }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (images.length > 0) {
        setLoading(false);
      } else {
        setHasError(true);
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [images.length]);

  const handleImageError = (): void => {
    console.error('Failed to load gallery image');
    setHasError(true);
  };

  if (loading) {
    return (
      <main className="container gallery-page">
        <div className="loading-state text-center py-5" role="status" aria-live="polite">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading gallery...</p>
        </div>
      </main>
    );
  }

  if (hasError || images.length === 0) {
    return (
      <main className="container gallery-page">
        <div className="error-state text-center py-5" role="alert">
          <p className="text-danger">Failed to load gallery images. Please try again later.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container-fluid gallery-container" id="gallery-section">
      <div className="image-gallery-wrapper sliders mb-5">
        <ImageGallery
          items={images}
          showBullets
          showIndex={false}
          showThumbnails={false}
          lazyLoad
          thumbnailPosition="bottom"
          showPlayButton={false}
          renderLeftNav={(onClick, disabled) => (
            <button
              type="button"
              className="image-gallery-icon image-gallery-left-nav"
              disabled={disabled}
              onClick={onClick}
              aria-label="Previous image"
            >
              <ArrowBackIosIcon className="ArrowLeftIcon" />
            </button>
          )}
          renderRightNav={(onClick, disabled) => (
            <button
              type="button"
              className="image-gallery-icon image-gallery-right-nav"
              disabled={disabled}
              onClick={onClick}
              aria-label="Next image"
            >
              <ArrowForwardIosIcon className="ArrowRightIcon" />
            </button>
          )}
          renderFullscreenButton={(onClick, isFullscreen) => (
            <button
              type="button"
              className="image-gallery-icon image-gallery-fullscreen-button"
              onClick={onClick}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              <OpenInFullIcon className="fullScreenButton" />
            </button>
          )}
          useBrowserFullscreen
          autoPlay={false}
          slideInterval={4000}
          slideDuration={450}
          swipeThreshold={50}
          showNav
          indexSeparator=" of "
          additionalClass="custom-image-gallery"
          onImageError={handleImageError}
        />
      </div>
    </main>
  );
};

export default Gallery;
