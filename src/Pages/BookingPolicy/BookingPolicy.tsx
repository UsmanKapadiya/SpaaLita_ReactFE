import type { FC } from 'react';
import { useState, useEffect, useCallback } from 'react';
import './BookingPolicy.css';
import { BookingPolicyMockData } from '../../mockData/BookingPolicyMockData';
import BookNowButton from '../../Component/BookNowButton/BookNowButton';
import { BOOKING_POLICY } from '../../utils/constants';

interface PageContent {
  description: string;
}

interface BookingPolicyData {
  pageContent?: PageContent;
}

const BookingPolicy: FC = () => {
  const [policyData, setPolicyData] = useState<BookingPolicyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const loadPolicyData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');

      const data = await BookingPolicyMockData;

      if (!data) {
        throw new Error('No data received from server');
      }

      setPolicyData(data as BookingPolicyData);
    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : 'Failed to load booking policy data. Please try again.';
      setError(errorMessage);
      console.error('Error loading booking policy:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPolicyData();
  }, [loadPolicyData]);

  if (loading) {
    return (
      <main className="container booking-policy-page">
        <div className="loading-state text-center py-5" role="status" aria-live="polite">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading booking policy...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container booking-policy-page">
        <div className="error-state text-center py-5" role="alert" aria-live="assertive">
          <p className="error-message text-danger mb-3">{error}</p>
          <button
            className="btn btn-primary"
            onClick={loadPolicyData}
            aria-label="Retry loading booking policy"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  if (!policyData?.pageContent?.description) {
    return (
      <main className="container booking-policy-page">
        <div className="no-data text-center py-5" role="status">
          <p>Booking policy information is not available at this time.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container booking-policy-page">
      <div className="wp-block-buttons is-content-justification-center is-layout-flex wp-container-core-buttons-is-layout-16018d1d wp-block-buttons-is-layout-flex">
        <BookNowButton url={BOOKING_POLICY} />
      </div>

      <article className="col-lg-10 m-auto booking-policy-content">
        <div
          dangerouslySetInnerHTML={{ __html: policyData.pageContent.description }}
          aria-label="Booking policy details"
        />
      </article>
    </main>
  );
};

export default BookingPolicy;