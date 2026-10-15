import type { FC } from 'react';
import { FRESHA_BOOK_NOW_URL } from '../../utils/constants';

interface BookNowButtonProps {
    text?: string;
    url?: string;
    className?: string;
    marginTop?: string;
    marginBottom?: string;
    showStrong?: boolean;
}

const BookNowButton: FC<BookNowButtonProps> = ({ 
    text = 'BOOK NOW!', 
    url = FRESHA_BOOK_NOW_URL,
    className = '',
    marginTop = 'mt-0',
    marginBottom = 'mb-0',
    showStrong = true
}) => {
    return (
        <div className={`wp-block-buttons is-content-justification-center is-layout-flex wp-container-core-buttons-is-layout-16018d1d wp-block-buttons-is-layout-flex ${className}`}>
            <div className={`wp-block-button centerAlign ${marginTop} ${marginBottom}`}>
                <a 
                    className="wp-block-button__link wp-element-button"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {showStrong ? <strong>{text}</strong> : text}
                </a>
            </div>
        </div>
    )
}

export default BookNowButton