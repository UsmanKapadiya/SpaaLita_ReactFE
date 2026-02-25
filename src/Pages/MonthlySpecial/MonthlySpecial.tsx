//@ts-nocheck
import { useState, useEffect, useMemo, type FC } from 'react';
import { fetchMonthlySpecial } from '../../mockData/monthlySpecialMockData';
import BookNowButton from '../../Component/BookNowButton/BookNowButton';
import LoadingSpinner from '../../Component/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../Component/ErrorMessage/ErrorMessage';
import { MONTHLY_BOOK_NOW_URL } from '../../utils/constants';
import { getAllMonthlySpecial } from '../../Services/HomeServices'
import './MonthlySpecial.css';

interface MonthlySpecialItem {
  _id: string;
  month: string;
  image: string;
  buttonUrl?: string;
}

const MonthlySpecial: FC = () => {
  const [specialData, setSpecialData] = useState<MonthlySpecialItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const currentMonth = useMemo(
    () =>
      new Date().toLocaleString("default", { month: "long" }),
    []
  );

  useEffect(() => {
    const fetchMonthlySpecial = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllMonthlySpecial(currentMonth);

        if (!response.success || !response.data?.length) {
          throw new Error("No monthly specials found.");
        }

        setSpecialData(response.data[0]);

      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to fetch monthly special.";
        setError(message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlySpecial();
  }, [currentMonth]);

  // ------------------ Loading ------------------
  if (loading) {
    return <LoadingSpinner message="Loading monthly specials..." />;
  }

  // ------------------ Error ------------------
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // ------------------ No Data ------------------
  if (!specialData) {
    return (
      <div className="container text-center py-5">
        <p>No special offers available at this time.</p>
      </div>
    );
  }

  // ------------------ Success ------------------
  return (
    <div className="container">
      <BookNowButton
        url={specialData.buttonUrl || MONTHLY_BOOK_NOW_URL}
      />

      <div className="my-5 py-3 px-5 text-center">
        <h1 className="specials-features">
          SPECIALS AND FEATURES
        </h1>
        <h4 className="font-weight-bold">
          Experience the magic of relaxation at Spa A'lita.
        </h4>
      </div>

      <figure className="wp-block-gallery is-layout-flex">
        <figure className="wp-block-image size-large text-center">
          <img
            src={specialData.image}
            alt={`${specialData.month} Monthly Special`}
            className="monthlySpecial-img img-fluid"
            loading="lazy"
          />
        </figure>
      </figure>
    </div>
  );
};

export default MonthlySpecial;