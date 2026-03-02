import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateUser } from '../../Services/UserServices';
import { toast } from 'react-toastify';
import { login } from '../../store/authSlice';

const AccountDetails: FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const token = useAppSelector((state) => state.auth.token);
    const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)

    const [accountData, setAccountData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        displayName: user?.userName || "",
        email: user?.email || "",
        passwordCurrent: "",
        passwordNew: "",
        passwordConfirm: "",
        newsletterOption: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAccountData((prev) => ({
            ...prev,
            [name]: value, // store the selected radio value
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            const payload = {
                firstName: accountData.firstName,
                lastName: accountData.lastName,
                userName: accountData.displayName,
                email: accountData.email,
                newsletterOption: accountData.newsletterOption,
            };

            const res = await updateUser(user.id, payload);

                console.log(res)
            dispatch(login({user: res.data, token: token}));

            toast.success("Account updated successfully");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };
    console.log(user);
    return (
        <div className="">
            <form
                className="woocommerce-EditAccountForm edit-account w-75"
                onSubmit={handleSubmit}
                method="post"
            >
                <div className="row">
                    <div className="col-md-6">
                        <p className="woocommerce-form-row woocommerce-form-row--first form-row form-row-first">
                            <label htmlFor="account_first_name">First name&nbsp;<span className="required">*</span></label>
                            <input
                                type="text"
                                className="woocommerce-Input woocommerce-Input--text input-text form-control"
                                name="firstName"
                                id="account_first_name"
                                autoComplete="given-name"
                                value={accountData.firstName}
                                onChange={handleChange}
                            />
                        </p>
                    </div>
                    <div className="col-md-6">
                        <p className="woocommerce-form-row woocommerce-form-row--last form-row form-row-last">
                            <label htmlFor="account_last_name">Last name&nbsp;<span className="required">*</span></label>
                            <input
                                type="text"
                                className="woocommerce-Input woocommerce-Input--text input-text form-control"
                                name="lastName"
                                id="account_last_name"
                                autoComplete="family-name"
                                value={accountData.lastName}
                                onChange={handleChange}
                            />
                        </p>
                    </div>
                </div>

                <div className="clear"></div>

                <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <label htmlFor="account_display_name">Display name&nbsp;<span className="required">*</span></label>
                    <input
                        type="text"
                        className="woocommerce-Input woocommerce-Input--text input-text form-control"
                        name="displayName"
                        id="account_display_name"
                        value={accountData.displayName}
                        disabled={true}
                        onChange={handleChange}
                    />
                    <span><em>This will be how your name will be displayed in the account section and in reviews</em></span>
                </p>

                <div className="clear"></div>

                <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <label htmlFor="account_email">Email address&nbsp;<span className="required">*</span></label>
                    <input
                        type="email"
                        className="woocommerce-Input woocommerce-Input--email input-text form-control"
                        name="email"
                        id="account_email"
                        disabled={true}
                        autoComplete="email"
                        value={accountData.email}
                        onChange={handleChange}
                    />
                </p>

                <fieldset>
                    <legend>Password change</legend>
                    <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                        <label htmlFor="password_current">Current password (leave blank to leave unchanged)</label>
                        <span className="password-input">
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                className="woocommerce-Input woocommerce-Input--password input-text form-control"
                                name="passwordCurrent"
                                value={accountData.passwordCurrent}
                                onChange={handleChange}
                            />
                            <span className="password-toggle-icon" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                            </span>
                        </span>
                    </p>
                    {/* New Password & Confirm Password */}
                    <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                        <label htmlFor="password_1">New password (leave blank to leave unchanged)</label>
                        <span className="password-input">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                className="woocommerce-Input woocommerce-Input--password input-text form-control"
                                name="passwordNew"
                                value={accountData.passwordNew}
                                onChange={handleChange}
                            />
                            <span className="password-toggle-icon" onClick={() => setShowNewPassword(!showNewPassword)}>
                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                            </span>
                        </span>
                    </p>
                    <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                        <label htmlFor="password_2">Confirm new password</label>
                        <span className="password-input">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="woocommerce-Input woocommerce-Input--password input-text form-control"
                                name="passwordConfirm"
                                value={accountData.passwordConfirm}
                                onChange={handleChange}
                            />
                            <span className="password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </span>
                        </span>
                    </p>
                </fieldset>

                {/* Newsletter / Order Updates */}
                <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <label>
                        <input
                            type="radio"
                            name="newsletterOption"
                            value="subscribe"
                            checked={accountData.newsletterOption === "subscribe"}
                            onChange={handleChange}
                        />&nbsp; Subscribe to our newsletter
                    </label>
                </p>
                <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <label>
                        <input
                            type="radio"
                            name="newsletterOption"
                            value="unsubscribe"
                            checked={accountData.newsletterOption === "unsubscribe"}
                            onChange={handleChange}
                        />&nbsp; Unsubscribe from our newsletter
                    </label>
                </p>
                <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <label>
                        <input
                            type="radio"
                            name="newsletterOption"
                            value="orderUpdates"
                            checked={accountData.newsletterOption === "orderUpdates"}
                            onChange={handleChange}
                        />&nbsp; Receive Order Updates
                    </label>
                </p>

                <p>
                    <button type="submit" className="woocommerce-Button button" name="save_account_details" value="Save changes">Save changes</button>
                </p>
            </form>
        </div>
    );
};

export default AccountDetails;
