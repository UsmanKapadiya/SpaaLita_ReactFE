//@ts-nocheck
import { useState, useEffect } from 'react';
import './MonthlySpecial.css';
import { fetchMonthlySpecial } from '../../mockData/monthlySpecialMockData.js';
import BookNowButton from '../../Component/BookNowButton/BookNowButton.js';
import LoadingSpinner from '../../Component/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../Component/ErrorMessage/ErrorMessage';
import { MONTHLY_BOOK_NOW_URL } from '../../utils/constants.js';

interface SpecialImage {
    url: string;
    alt: string;
    sizes: string;
}

interface SpecialData {
    id: number;
    month: string;
    image: SpecialImage;
    validUntil: string;
    featured: boolean;
}

const MonthlySpecial: React.FC = () => {
    const [specialData, setSpecialData] = useState<SpecialData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadSpecialData = async () => {
            try {
                setLoading(true);
                const data = await fetchMonthlySpecial();
                setSpecialData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load monthly special data');
            } finally {
                setLoading(false);
            }
        };

        loadSpecialData();
    }, []);

    if (loading) {
        return <LoadingSpinner message="Loading monthly specials..." />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!specialData) {
        return (
            <div className="container">
                <div className="no-data text-center py-5">
                    <p>No special offers available at this time.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <BookNowButton url={MONTHLY_BOOK_NOW_URL} />
            <div className="my-5 py-3 px-5">
                <h1 className="wp-block-heading specials-features text-center" id="specials-and-features">
                    SPECIALS AND FEATURES
                </h1>
                <h4 className="wp-block-heading font-weight-bold text-center" id="monthly-specials">
                    Experience the magic of relaxation at Spa A'lita.
                </h4>
            </div>

            <figure className="wp-block-gallery has-nested-images columns-default is-cropped wp-block-gallery-3 is-layout-flex wp-block-gallery-is-layout-flex">
                <figure className="wp-block-image size-large">
                    <img
                        decoding="async"
                        src={specialData.image.url}
                        alt={specialData.image.alt}
                        className="wp-image-18083 monthlySpecial-img"
                        sizes={specialData.image.sizes}
                    />
                </figure>
            </figure>
        </div>
    );
}

export default MonthlySpecial