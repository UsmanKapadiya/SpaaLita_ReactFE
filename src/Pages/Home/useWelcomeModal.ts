import { useState, useEffect } from 'react';
import { storage } from '../../utils/storage';

interface UseWelcomeModalReturn {
  showModal: boolean;
  closeModal: () => void;
}

export const useWelcomeModal = (storageKey: string): UseWelcomeModalReturn => {
  const [showModal, setShowModal] = useState<boolean>(false);

  // Check if modal should be shown on mount
  useEffect(() => {
    const modalShown = storage.getItem(storageKey);
    if (!modalShown) {
      setShowModal(true);
    }
  }, [storageKey]);

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

  return { showModal, closeModal };
};
