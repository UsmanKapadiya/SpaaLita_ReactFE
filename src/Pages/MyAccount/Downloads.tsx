import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import WebAssetIcon from '@mui/icons-material/WebAsset';

const Downloads: FC = () => {
    const navigate = useNavigate();

    return (
        <div className="woocommerce-info" role="status">
            <span>
                <WebAssetIcon className='icon-color mr-2' />
            </span>
            No downloads available yet.
            <button className="woocommerce-Button wc-forward button" onClick={() => navigate('/shop')}>Browse products</button>
        </div>
    );
};

export default Downloads;
