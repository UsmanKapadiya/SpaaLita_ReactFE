
import { useState, type FC, type FormEvent } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from '../../Services/UserServices.js'

const ResetPassword: FC = () => {

    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            const payload = { password };

            const response = await resetPassword(token, payload);

            if (response?.success) {
                toast.success(response.message);
                setMessage(response.message);

                setTimeout(() => {
                    navigate("/my-account");
                }, 2000);
            }

        } catch (error: any) {
            setMessage(error?.response?.data?.message || "Something went wrong");
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
                            Enter your new password below to reset your account password.
                        </p>

                        {/* New Password */}
                        <p className="woocommerce-form-row woocommerce-form-row--first form-row form-row-first">
                            <label htmlFor="password">New Password</label>

                            <input
                                className="woocommerce-Input woocommerce-Input--text input-text form-control"
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </p>

                        {/* Confirm Password */}
                        <p className="woocommerce-form-row woocommerce-form-row--last form-row form-row-last">
                            <label htmlFor="confirm_password">Confirm Password</label>

                            <input
                                className="woocommerce-Input woocommerce-Input--text input-text form-control"
                                type="password"
                                name="confirm_password"
                                id="confirm_password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </p>

                        <div className="clear"></div>

                        <p className="woocommerce-form-row form-row">
                            <button
                                type="submit"
                                className="woocommerce-Button wc-forward"
                            >
                                Save New Password
                            </button>
                        </p>

                    </form>

                </div>
            </div>
        </div>
    );
};


export default ResetPassword;