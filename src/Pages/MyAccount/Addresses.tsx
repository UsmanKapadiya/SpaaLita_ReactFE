import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateUserAddress } from '../../Services/UserServices';
import { toast } from 'react-toastify';
import { updateUserAddresses } from '../../store/authSlice';
interface BillingDetails {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    postcode: string;
    phone: string;
    email: string;
}

interface ShippingDetails {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    state: string;
    city: string;
    country: string;
    postcode: string;
    giftCard: string;
}

const emptyBilling: BillingDetails = {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    country: 'CA',
    state: '',
    city: '',
    postcode: '',
    phone: '',
    email: '',
};

const emptyShipping: ShippingDetails = {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    country: 'CA',
    state: '',
    city: '',
    postcode: '',
    giftCard: '',
};
const Addresses: FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const [editingBilling, setEditingBilling] = useState<boolean>(false);
    const [editingShipping, setEditingShipping] = useState<boolean>(false);
    const [billingDetails, setBillingDetails] = useState<BillingDetails>(emptyBilling);
    const [shippingDetails, setShippingDetails] = useState<ShippingDetails>(emptyShipping);
    const [loading, setLoading] = useState<boolean>(false)
    const [billingLoading, setBillingLoading] = useState<boolean>(false)
    useEffect(() => {
        setBillingDetails(user.billing || null);
        setShippingDetails(user.shipping || null);
    }, [user])

    const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBillingDetails(prev => ({ ...prev, [name]: value }));
    };
    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setShippingDetails(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSave = async () => {
        try {
            setLoading(true);
            const payload =  {
                billing: billingDetails,
                shipping: shippingDetails,
            }
            const res = await updateUserAddress(user?.id, payload );
    
            toast.success(res.message);
            dispatch(updateUserAddresses(payload));
            setEditingBilling(false);
            setEditingShipping(false);
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to update addresses");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="account-addresses">
            <p className="addresses-intro">
                The following addresses will be used on the checkout page by default.
            </p>
            <div className="row">
                {/* Billing Address */}
                <div className="col-md-6 mb-4">
                    <div className="address-box">
                        <h3>Billing Address</h3>
                        <p
                            className="mb-0 edit-link"
                            onClick={() => setEditingBilling(!editingBilling)}
                        >
                            {editingBilling ? "Close" : "Edit"}
                        </p>
                        <p>
                            {billingDetails.firstName} {billingDetails.lastName} <br />
                            {billingDetails.address1}
                            {billingDetails.address2 && `, ${billingDetails.address2}`}
                            <br />
                            {billingDetails.city}, {billingDetails.state} {billingDetails.postcode}
                            <br />
                            {billingDetails.country} <br />
                            {billingDetails.phone} | {billingDetails.email}
                        </p>

                        {editingBilling && (
                            <div className="address-form-container mt-3">
                                <form className="address-form" onSubmit={(e) => e.preventDefault()}>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>First Name *</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                className="form-control"
                                                value={billingDetails.firstName}
                                                onChange={handleBillingChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Last Name *</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                className="form-control"
                                                value={billingDetails.lastName}
                                                onChange={handleBillingChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Street Address *</label>
                                        <input
                                            type="text"
                                            name="address1"
                                            className="form-control"
                                            placeholder="House number and street name"
                                            value={billingDetails.address1}
                                            onChange={handleBillingChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="address2"
                                            className="form-control"
                                            placeholder="Apartment, suite, unit, etc. (optional)"
                                            value={billingDetails.address2}
                                            onChange={handleBillingChange}
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>City *</label>
                                            <input
                                                type="text"
                                                name="city"
                                                className="form-control"
                                                value={billingDetails.city}
                                                onChange={handleBillingChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Province *</label>
                                            <select
                                                name="state"
                                                className="form-control"
                                                style={{ height: "auto" }}
                                                value={billingDetails.state}
                                                onChange={handleBillingChange}
                                            >
                                                <option value="">Select Province</option>
                                                <option value="ON">Ontario</option>
                                                <option value="BC">British Columbia</option>
                                                <option value="AB">Alberta</option>
                                                <option value="QC">Quebec</option>
                                                <option value="MB">Manitoba</option>
                                                <option value="SK">Saskatchewan</option>
                                                <option value="NS">Nova Scotia</option>
                                                <option value="NB">New Brunswick</option>
                                                <option value="PE">Prince Edward Island</option>
                                                <option value="NL">Newfoundland and Labrador</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Postal Code *</label>
                                            <input
                                                type="text"
                                                name="postcode"
                                                className="form-control"
                                                value={billingDetails.postcode}
                                                onChange={handleBillingChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Country *</label>
                                            <input
                                                type="text"
                                                name="country"
                                                className="form-control"
                                                value={billingDetails.country}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Phone *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="form-control"
                                            value={billingDetails.phone}
                                            onChange={handleBillingChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={billingDetails.email}
                                            onChange={handleBillingChange}
                                        />
                                    </div>

                                    <div className="form-actions">
                                        <button
                                            type="button"
                                            className="btn-save-address"
                                            onClick={handleSave}
                                            disabled={billingLoading}
                                        >
                                            {billingLoading ? "Saving..." : "Save Addresses"}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-cancel"
                                            onClick={() => setEditingBilling(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="col-md-6 mb-4">
                    <div className="address-box">
                        <h3>Shipping Address</h3>
                        <p
                            className="mb-0 add-link"
                            onClick={() => setEditingShipping(!editingShipping)}
                        >
                            {editingShipping ? "Close" : "Add"}
                        </p>
                        <p>

                            {shippingDetails ? (
                                <>
                                    {shippingDetails.firstName} {shippingDetails.lastName} <br />
                                    {shippingDetails.address1}
                                    {shippingDetails.address2 ? `, ${shippingDetails.address2}` : ""} <br />
                                    {shippingDetails.city}, {shippingDetails.state} {shippingDetails.postcode} <br />
                                    {shippingDetails.country} <br />

                                </>
                            ) : (
                                "You have not set up this type of address yet."
                            )}
                        </p>


                        {editingShipping && (
                            <div className="address-form-container mt-3">
                                <form className="address-form" onSubmit={(e) => e.preventDefault()}>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>First Name *</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                className="form-control"
                                                value={shippingDetails?.firstName || ""}
                                                onChange={handleShippingChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Last Name *</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                className="form-control"
                                                value={shippingDetails?.lastName || ""}
                                                onChange={handleShippingChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Street Address *</label>
                                        <input
                                            type="text"
                                            name="address1"
                                            className="form-control"
                                            placeholder="House number and street name"
                                            value={shippingDetails?.address1 || ""}
                                            onChange={handleShippingChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="address2"
                                            className="form-control"
                                            placeholder="Apartment, suite, unit, etc. (optional)"
                                            value={shippingDetails?.address2 || ""}
                                            onChange={handleShippingChange}
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>City *</label>
                                            <input
                                                type="text"
                                                name="city"
                                                className="form-control"
                                                value={shippingDetails?.city || ""}
                                                onChange={handleShippingChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Province *</label>
                                            <select
                                                name="state"
                                                className="form-control"
                                                style={{ height: "auto" }}
                                                value={shippingDetails?.state || ""}
                                                onChange={handleShippingChange}
                                            >
                                                <option value="">Select Province</option>
                                                <option value="ON">Ontario</option>
                                                <option value="BC">British Columbia</option>
                                                <option value="AB">Alberta</option>
                                                <option value="QC">Quebec</option>
                                                <option value="MB">Manitoba</option>
                                                <option value="SK">Saskatchewan</option>
                                                <option value="NS">Nova Scotia</option>
                                                <option value="NB">New Brunswick</option>
                                                <option value="PE">Prince Edward Island</option>
                                                <option value="NL">Newfoundland and Labrador</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Postal Code *</label>
                                            <input
                                                type="text"
                                                name="postcode"
                                                className="form-control"
                                                value={shippingDetails?.postcode || ""}
                                                onChange={handleShippingChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Country *</label>
                                            <input
                                                type="text"
                                                name="country"
                                                className="form-control"
                                                value={shippingDetails?.country || ""}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="form-actions">
                                        <button
                                            type="button"
                                            className="btn-save-address"
                                            onClick={handleSave}
                                            disabled={loading}
                                        >
                                            {loading ? "Saving..." : "Save Addresses"}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-cancel"
                                            onClick={() => setEditingShipping(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Addresses;
