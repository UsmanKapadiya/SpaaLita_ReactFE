import { useState, useEffect } from 'react';
import { storage } from '../../utils/storage';
import { getAllMonthlySpecial } from '../../Services/HomeServices'
interface UseWelcomeModalReturn {
  showModal: boolean;
  closeModal: () => void;
  monthlySpecialUrl: string;
  isLoading: boolean;
}
const monthOptions = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const useWelcomeModal = (storageKey: string): UseWelcomeModalReturn => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [monthlySpecialUrl, setMonthlySpecialUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let CurrentMonth = monthOptions[new Date().getMonth()];
  
  useEffect(() => {
    const fetchMonthlySpecial = async () => {
      try {
        const response = await getAllMonthlySpecial(CurrentMonth);
        if (response.success === true) {
          const data = response.data;
          if (data.length > 0) {
            setMonthlySpecialUrl(data[0].image);
          };
        }
      } catch (error) {
        console.error('Failed to fetch monthly special:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMonthlySpecial();
  }, []);

  // Check if modal should be shown on mount
  useEffect(() => {
    const modalShown = storage.getItem(storageKey);
    if (!modalShown && !isLoading) {
      setShowModal(true);
    }
  }, [storageKey, isLoading]);

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [showModal]);

  const closeModal = (): void => {
    setShowModal(false);
    storage.setItem(storageKey, 'true');
  };

  return { showModal, closeModal, monthlySpecialUrl, isLoading };
};
