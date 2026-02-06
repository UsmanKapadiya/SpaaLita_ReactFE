import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AccountDetails = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="">                    
            <form className="woocommerce-EditAccountForm edit-account w-75" action="" method="post">                            
                <div className="row">
                    <div className="col-md-6">
                        <p className="woocommerce-form-row woocommerce-form-row--first form-row form-row-first">
                            <label htmlFor="account_first_name">First name&nbsp;<span className="required">*</span></label>
                            <input type="text" className="woocommerce-Input woocommerce-Input--text input-text form-control" name="account_first_name" id="account_first_name" autoComplete="given-name" defaultValue="Spaalita" />
                        </p>
                    </div>
                    <div className="col-md-6">
                        <p className="woocommerce-form-row woocommerce-form-row--last form-row form-row-last">
                            <label htmlFor="account_last_name">Last name&nbsp;<span className="required">*</span></label>
                            <input type="text" className="woocommerce-Input woocommerce-Input--text input-text form-control" name="account_last_name" id="account_last_name" autoComplete="family-name" defaultValue="" />
                        </p>
                    </div>
                </div>
                <div className="clear"></div>

                <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <label htmlFor="account_display_name">Display name&nbsp;<span className="required">*</span></label>
                    <input type="text" className="woocommerce-Input woocommerce-Input--text input-text form-control" name="account_display_name" id="account_display_name" defaultValue="Spaalita" />
                    <span><em>This will be how your name will be displayed in the account section and in reviews</em></span>
                </p>
                <div className="clear"></div>

                <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <label htmlFor="account_email">Email address&nbsp;<span className="required">*</span></label>
                    <input type="email" className="woocommerce-Input woocommerce-Input--email input-text form-control" name="account_email" id="account_email" autoComplete="email" defaultValue="spaalitaoffice@shaw.ca" />
                </p>

                <fieldset>
                    <legend>Password change</legend>

                    <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                        <label htmlFor="password_current">Current password (leave blank to leave unchanged)</label>
                        <span className="password-input">
                            <input 
                                type={showCurrentPassword ? "text" : "password"} 
                                className="woocommerce-Input woocommerce-Input--password input-text form-control" 
                                name="password_current" 
                                id="password_current" 
                                autoComplete="off" 
                            />
                            <span className="password-toggle-icon" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                            </span>
                        </span>
                    </p>
                    <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                        <label htmlFor="password_1">New password (leave blank to leave unchanged)</label>
                        <span className="password-input">
                            <input 
                                type={showNewPassword ? "text" : "password"} 
                                className="woocommerce-Input woocommerce-Input--password input-text form-control" 
                                name="password_1" 
                                id="password_1" 
                                autoComplete="off" 
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
                                name="password_2" 
                                id="password_2" 
                                autoComplete="off" 
                            />
                            <span className="password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </span>
                        </span>
                    </p>
                </fieldset>
                <div className="clear"></div>

                <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <label htmlFor="mailchimp_woocommerce_is_subscribed">
                        <input type="radio" className="woocommerce-form__input woocommerce-form__input-radio input-radio" name="mailchimp_woocommerce_is_subscribed_radio" id="mailchimp_woocommerce_is_subscribed" value="1" />
                        Subscribe to our newsletter
                    </label>
                </p>
                <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <label htmlFor="mailchimp_woocommerce_is_unsubscribed">
                        <input type="radio" className="woocommerce-form__input woocommerce-form__input-radio input-radio" name="mailchimp_woocommerce_is_subscribed_radio" id="mailchimp_woocommerce_is_unsubscribed" value="unsubscribed" />
                        Unsubscribe from our newsletter
                    </label>
                </p>
                <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                    <label htmlFor="mailchimp_woocommerce_is_transactional">
                        <input type="radio" className="woocommerce-form__input woocommerce-form__input-radio input-radio" name="mailchimp_woocommerce_is_subscribed_radio" id="mailchimp_woocommerce_is_transactional" value="0" />
                        Receive Order Updates
                    </label>
                </p>
                <p>
                    <input type="hidden" id="save-account-details-nonce" name="save-account-details-nonce" value="88f29c13b5" />
                    <input type="hidden" name="_wp_http_referer" value="/my-account/edit-account/" />
                    <button type="submit" className="woocommerce-Button button" name="save_account_details" value="Save changes">Save changes</button>
                    <input type="hidden" name="action" value="save_account_details" />
                </p>
            </form>
        </div>
    );
};

export default AccountDetails;
