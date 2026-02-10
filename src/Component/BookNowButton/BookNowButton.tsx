import type { FC } from 'react';

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
    url = 'https://www.fresha.com/book-now/spa-alita-v6pl5cct/services?lid=1090026&pId=1033567',
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