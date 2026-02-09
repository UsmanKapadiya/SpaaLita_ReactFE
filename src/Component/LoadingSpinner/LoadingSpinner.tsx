interface LoadingSpinnerProps {
    message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
    return (
        <div className="container">
            <div className="loading-spinner text-center py-5">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
