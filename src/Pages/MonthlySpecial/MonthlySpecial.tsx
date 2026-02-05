// @ts-nocheck
import { useState, useEffect } from 'react';
import './MonthlySpecial.css';
import { fetchMonthlySpecial } from '../../mockData/monthlySpecialMockData.js';
import BookNowButton from '../../Component/BookNowButton/BookNowButton.js';

const MonthlySpecial = () => {
    const [specialData, setSpecialData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadSpecialData = async () => {
            try {
                setLoading(true);
                const data = await fetchMonthlySpecial();
                setSpecialData(data);
            } catch (err) {
                setError('Failed to load monthly special data');
            } finally {
                setLoading(false);
            }
        };

        loadSpecialData();
    }, []);

    if (loading) {
        return (
            <div className="container">
                <div className="loading-spinner text-center py-5">
                    <p>Loading monthly specials...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="error-message text-center py-5">
                    <p>{error}</p>
                </div>
            </div>
        );
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
            <BookNowButton />
            <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">
                <div className="wp-block-column my-5 is-layout-flow wp-block-column-is-layout-flow">
                    <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">
                        <div className="wp-block-column py-3 px-5 is-layout-flow wp-block-column-is-layout-flow">
                            <h1 className="wp-block-heading specials-features" id="specials-and-features">
                                SPECIALS AND FEATURES
                            </h1>
                            <h4 className="wp-block-heading font-weight-bold text-center" id="monthly-specials">
                                Experience the magic of relaxation at Spa A'lita.
                            </h4>
                        </div>
                    </div>
                </div>
            </div>

            <figure className="wp-block-gallery has-nested-images columns-default is-cropped wp-block-gallery-3 is-layout-flex wp-block-gallery-is-layout-flex">
                <figure className="wp-block-image size-large">
                    <img
                        decoding="async"
                        src={specialData?.image.url}
                        alt={specialData?.image.alt}
                        className="wp-image-18083 monthlySpecial-img"
                        sizes={specialData?.image.sizes}
                    />
                </figure>
            </figure>
            <figure className="wp-block-gallery has-nested-images columns-default is-cropped wp-block-gallery-4 is-layout-flex wp-block-gallery-is-layout-flex">
            </figure>
        </div>
    );
}

export default MonthlySpecial