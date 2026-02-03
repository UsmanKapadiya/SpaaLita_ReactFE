import React, { useState, useEffect } from 'react';
import './BookingPolicy.css'
import { BookingPolicyMockData } from '../../mockData/BookingPolicyMockData.js';

const BookingPolicy = () => {
    const [specialData, setSpecialData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadSpecialData = async () => {
            try {
                setLoading(true);
                const data = await BookingPolicyMockData;
                console.log(data)
                setSpecialData(data);
            } catch (err) {
                setError('Failed to load monthly special data');
                console.error('Error loading special data:', err);
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
            <div className="wp-block-buttons is-content-justification-center is-layout-flex wp-container-core-buttons-is-layout-16018d1d wp-block-buttons-is-layout-flex">
                <div className="wp-block-button centerAlign mt-0 pb-4">
                    <a className="wp-block-button__link wp-element-button"
                        href="https://www.fresha.com/book-now/spa-alita-v6pl5cct/services?lid=1090026&amp;pId=1033567">
                        <strong>BOOK NOW!</strong>
                    </a>
                </div>
            </div>

            <div className="col-lg-10 m-auto booking-policy-content">
                {specialData?.pageContent?.description && (
                    <div
                        dangerouslySetInnerHTML={{ __html: specialData?.pageContent?.description }}
                    />
                )}
            </div>
        </div>
    );
}

export default BookingPolicy