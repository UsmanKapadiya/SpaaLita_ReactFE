// @ts-nocheck
import React from 'react';
import { HOME_URLS } from './homeConstants';



const WelcomeModal = ({ show, onClose }) => {
  if (!show) return null;

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div 
        className="modal fade show welcome-modal" 
        tabIndex={-1} 
        role="dialog" 
        id="home_modal"
        onKeyDown={handleKeyDown}
        aria-labelledby="welcomeModalTitle"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="text-center w-100" id="welcomeModalTitle">
                <img 
                  src={HOME_URLS.LOGO} 
                  width="210" 
                  alt="Spa A'lita Logo"
                />
              </div>
              <button 
                type="button" 
                className="close modal-close-button" 
                onClick={onClose}
                aria-label="Close modal"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="col-lg-12">
                  <figure className="wp-block-gallery has-nested-images columns-default is-cropped wp-block-gallery-1">
                    <img 
                      decoding="async" 
                      width="1024" 
                      height="1024" 
                      src={HOME_URLS.MONTHLY_SPECIAL} 
                      alt="February Specials" 
                      className="wp-image-18083 modal-special-image"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeModal;
