import type { FC } from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

interface ProductNavigationProps {
    isFirstProduct: boolean;
    isLastProduct: boolean;
    onPrevious: () => void;
    onNext: () => void;
}

const ProductNavigation: FC<ProductNavigationProps> = ({
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
