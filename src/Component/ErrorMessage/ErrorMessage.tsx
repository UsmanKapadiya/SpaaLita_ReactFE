interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="container">
            <div className="error-message text-center py-5">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ErrorMessage;
