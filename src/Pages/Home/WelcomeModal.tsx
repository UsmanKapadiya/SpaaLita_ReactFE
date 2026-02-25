import type { FC, KeyboardEvent } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { HOME_URLS } from './homeConstants';

interface WelcomeModalProps {
  show: boolean;
  onClose: () => void;
  monthlySpecialUrl: string;
}

const WelcomeModal: FC<WelcomeModalProps> = ({ show, onClose, monthlySpecialUrl }) => {
  if (!show) return null;

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
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
                className="modal-close-button bg-none"
                onClick={onClose}
                aria-label="Close modal"
              >
                <CloseIcon 
                  onClick={onClose}
                  // style={{ fontSize: '1.5rem', color: '#404040', cursor: 'pointer' }} 
                />
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
                      src={monthlySpecialUrl || HOME_URLS.MONTHLY_SPECIAL}
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
