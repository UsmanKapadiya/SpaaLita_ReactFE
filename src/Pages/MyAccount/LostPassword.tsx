


import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyAccount.css';

const LostPassword = () => {
    const navigate = useNavigate();

    const handleResetPassword = (e) => {
        e.preventDefault();
        console.log('Password reset link sent');
        navigate('/my-account');
    };

    return (
        <div className="my-account-page">
            <div className="container py-5">
                <div className="woocommerce">
                    <div className="woocommerce-notices-wrapper"></div>
                    <form method="post" className="woocommerce-ResetPassword lost_reset_password w-50" onSubmit={handleResetPassword}>
                        <p>Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.</p>
                        <p className="woocommerce-form-row woocommerce-form-row--first form-row form-row-first">
                            <label htmlFor="user_login">Username or email</label>
                            <input className="woocommerce-Input woocommerce-Input--text input-text form-control" type="text" name="user_login" id="user_login" autoComplete="username" />
                        </p>

                        <div className="clear"></div>

                        <p className="woocommerce-form-row form-row">
                            <input type="hidden" name="wc_reset_password" value="true" />
                            <button type="submit" className="woocommerce-Button wc-forward" value="Reset password">Reset password</button>
                        </p>

                        <input type="hidden" id="woocommerce-lost-password-nonce" name="woocommerce-lost-password-nonce" value="e7a052ac25" />
                        <input type="hidden" name="_wp_http_referer" value="/my-account/lost-password/" />
                    </form>

                </div>
            </div>
        </div>
    );
};

export default LostPassword;
