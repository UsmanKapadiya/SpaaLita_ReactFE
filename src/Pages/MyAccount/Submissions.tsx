import React from 'react';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import './MyAccount.css'

const Submissions = () => {
    return (
        <div className="erf-my-account clearfix">
            <div className="erf-my-account-content">

                <div className="erf-my-account-profile-tab">
                    <div className="erf-my-account-submissions">


                        <div className="woocommerce-info justify-content-start" role="status">
                            <span>
                                <WebAssetIcon className='icon-color mr-2' />
                            </span>
                            No submission yet.
                        </div>
                    </div>
                    <div className="erf-account-pagination clearfix">

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Submissions;
