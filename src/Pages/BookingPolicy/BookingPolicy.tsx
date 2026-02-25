//@ts-nocheck
import { FC, useEffect, useState, useCallback } from "react";
import { getBookingPolicy } from "../../Services/BookingPolicyServices";
import BookNowButton from '../../Component/BookNowButton/BookNowButton';
import { BOOKING_POLICY } from '../../utils/constants';

interface BookingPolicyItem {
  _id: string;
  title: string;
  description: string;
  buttonUrl?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const BookingPolicy: FC = () => {
  const [policyData, setPolicyData] = useState<BookingPolicyItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const loadPolicyData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getBookingPolicy();

      if (!response.success || !response.data?.length) {
        throw new Error("No booking policy data found.");
      }

      const activePolicy = response.data.find(
        (item: BookingPolicyItem) =>
          item.status?.toLowerCase() === "active"
      );

      if (!activePolicy) {
        throw new Error("No active booking policy found.");
      }

      setPolicyData(activePolicy);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load booking policy. Please try again.";

      setError(message);
      console.error("Error loading booking policy:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPolicyData();
  }, [loadPolicyData]);

  // ------------------ Loading ------------------
  if (loading) {
    return (
      <main className="container booking-policy-page text-center py-5">
        <div className="spinner-border text-primary mb-3" role="status" />
        <p>Loading booking policy...</p>
      </main>
    );
  }

  // ------------------ Error ------------------
  if (error) {
    return (
      <main className="container booking-policy-page text-center py-5">
        <p className="text-danger mb-3">{error}</p>
        <button className="btn btn-primary" onClick={loadPolicyData}>
          Try Again
        </button>
      </main>
    );
  }

  // ------------------ No Data ------------------
  if (!policyData) {
    return (
      <main className="container booking-policy-page text-center py-5">
        <p>Booking policy information is not available.</p>
      </main>
    );
  }

  // ------------------ Success ------------------
  return (
    <main className="container booking-policy-page">
      <div className="text-center my-4">
        <BookNowButton
          url={policyData.buttonUrl || BOOKING_POLICY}
        />
      </div>

      <h4 className="text-center my-5">
        ONLINE BOOKING AND POLICY
      </h4>

      <article className="col-lg-10 m-auto booking-policy-content">
        <div
          dangerouslySetInnerHTML={{ __html: policyData.description }}
          aria-label="Booking policy details"
        />
      </article>
    </main>
  );
};

export default BookingPolicy;