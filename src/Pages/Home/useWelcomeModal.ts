// @ts-nocheck
import { useState, useEffect } from 'react';

export const useWelcomeModal = (storageKey) => {
  const [showModal, setShowModal] = useState(false);

  // Check if modal should be shown on mount
  useEffect(() => {
    const modalShown = localStorage.getItem(storageKey);
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

  const closeModal = () => {
    setShowModal(false);
    localStorage.setItem(storageKey, 'true');
  };

  return { showModal, closeModal };
};
