import React from 'react';
import { useNavigate } from 'react-router-dom';



const Dashboard = ({ userName }) => {
    const navigate = useNavigate();

    return (
        <div className="account-dashboard">
            <p className="welcome-message">
                Hello <strong>{userName}</strong>!
            </p>
            <p className="dashboard-info">
                From your account dashboard you can view your <span onClick={() => navigate('/my-account/orders')} className="link-text">recent orders</span>,
                manage your <span onClick={() => navigate('/my-account/addresses')} className="link-text">shipping and billing addresses</span>,
                and <span onClick={() => navigate('/my-account/account-details')} className="link-text">edit your password and account details</span>.
            </p>
        </div>
    );
};

export default Dashboard;
