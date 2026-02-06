import React from 'react';
import { useNavigate } from 'react-router-dom';
import WebAssetIcon from '@mui/icons-material/WebAsset';

const PaymentMethods = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="woocommerce-info" role="status">
                <span>
                    <WebAssetIcon className='icon-color mr-2' />
                </span>
                No payment methods saved yet.
            </div>
            <div>
                <button 
                    className="woocommerce-Button wc-forward button" 
                    onClick={() => navigate('/shop')}
                >
                    Add payment method
                </button>
            </div>
        </>
    );
};

export default PaymentMethods;
