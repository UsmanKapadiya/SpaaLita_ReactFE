//@ts-nocheck
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const ProductNavigation = ({
    isFirstProduct,
    isLastProduct,
    onPrevious,
    onNext
}) => {
    return (
        <div 
            className="mb-4 previous-next-product" 
            style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                width: '100%' 
            }}
        >
            {!isFirstProduct && (
                <KeyboardBackspaceIcon
                    onClick={onPrevious}
                    style={{ fontSize: '18px', cursor: 'pointer' }}
                />
            )}
            {!isLastProduct && (
                <ArrowRightAltIcon
                    onClick={onNext}
                    style={{ fontSize: '18px', cursor: 'pointer', marginLeft: 'auto' }}
                />
            )}
        </div>
    );
};

export default ProductNavigation;
