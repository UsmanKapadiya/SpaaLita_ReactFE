//@ts-nocheck
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './AddToCartMessage.css';


const AddToCartMessage = ({ itemTitle, onViewCart }) => {
    const navigate = useNavigate();

    const handleViewCart = () => {
        if (onViewCart) {
            onViewCart();
        } else {
            navigate('/cart');
        }
    };

    return (
        <div className="woocommerce-notices-wrapper">
            <div className="woocommerce-message d-flex align-items-center" role="alert" tabIndex={-1}>
                <span>
                    <CheckCircleIcon className='woocommerce-checkIcon'/>
                </span>
                <span className='ml-3'>
                    "{itemTitle}" has been added to your cart.
                </span>
                <button
                    onClick={handleViewCart}
                    className="button wc-forward shopButton ml-auto cart-link-button"
                >
                    View cart
                </button>
            </div>
        </div>
    );
};

export default AddToCartMessage;
