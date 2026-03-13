


import { useState, type FC, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../Services/UserServices.js'
import './MyAccount.css';
import { toast } from 'react-toastify';

const LostPassword: FC = () => {
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const payload = {
                    email: userLogin.includes("@") ? userLogin : undefined,
                    userName: !userLogin.includes("@") ? userLogin : undefined,
            }
            let response = await forgotPassword(payload );
            console.log(response);
           if (response?.success === true) {

            toast.success(response?.message);
            setMessage(response.message);

            // Extract token from resetLink
            const resetLink = response.resetLink;
            const token = resetLink.split("/").pop();

             navigate(`/my-account/reset-password/${token}`);
        }
         
        } catch (error: any) {
            setMessage(error.response?.message || "Something went wrong");
        }
    };

    return (
        <div className="my-account-page">
            <div className="container">
                <div className="woocommerce">
                    <div className="woocommerce-notices-wrapper">
                        {message && <p className="alert alert-info">{message}</p>}
                    </div>

                    <form
                        method="post"
                        className="woocommerce-ResetPassword lost_reset_password w-50"
                        onSubmit={handleResetPassword}
                    >
                        <p>
                            Lost your password? Please enter your username or email address.
                            You will receive a link to create a new password via email.
                        </p>

                        <p className="woocommerce-form-row woocommerce-form-row--first form-row form-row-first">
                            <label htmlFor="user_login">Username or email</label>

                            <input
                                className="woocommerce-Input woocommerce-Input--text input-text form-control"
                                type="text"
                                name="user_login"
                                id="user_login"
                                autoComplete="username"
                                value={userLogin}
                                onChange={(e) => setUserLogin(e.target.value)}
                                required
                            />
                        </p>

                        <div className="clear"></div>

                        <p className="woocommerce-form-row form-row">
                            <button
                                type="submit"
                                className="woocommerce-Button wc-forward"
                            >
                                Reset password
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LostPassword;
