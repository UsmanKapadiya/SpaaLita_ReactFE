import React, { useState } from 'react';

const Addresses = () => {
    const [editingBilling, setEditingBilling] = useState(false);
    const [editingShipping, setEditingShipping] = useState(false);

    return (
        <div className="account-addresses">
            <p className="addresses-intro">The following addresses will be used on the checkout page by default.</p>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="address-box">
                        <h3>Billing Address</h3>
                        <p className='mb-0 edit-link' onClick={() => setEditingBilling(!editingBilling)}>
                            {editingBilling ? 'Close' : 'Edit'}
                        </p>
                        <p>123 Main Street<br />Toronto, ON M5V 1A1<br />Canada</p>

                        {editingBilling && (
                            <div className="address-form-container mt-3">
                                <form className="address-form">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>First Name *</label>
                                            <input type="text" className="form-control" defaultValue="Spa" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Last Name *</label>
                                            <input type="text" className="form-control" defaultValue="Alita" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Company Name (optional)</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Street Address *</label>
                                        <input type="text" className="form-control" placeholder="House number and street name" defaultValue="123 Main Street" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Apartment, suite, unit, etc. (optional)" />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>City *</label>
                                            <input type="text" className="form-control" defaultValue="Toronto" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Province *</label>
                                            <select className="form-control" style={{ height: 'auto' }} defaultValue="ON">
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
                                            <input type="text" className="form-control" defaultValue="M5V 1A1" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Country *</label>
                                            <input type="text" className="form-control" defaultValue="Canada" readOnly />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone *</label>
                                        <input type="tel" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address *</label>
                                        <input type="email" className="form-control" defaultValue="info@spaalita.ca" />
                                    </div>
                                    <div className="form-actions">
                                        <button type="submit" className="btn-save-address">Save Address</button>
                                        <button type="button" className="btn-cancel" onClick={() => setEditingBilling(false)}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="address-box">
                        <h3>Shipping Address</h3>
                        <p className='mb-0 add-link' onClick={() => setEditingShipping(!editingShipping)}>
                            {editingShipping ? 'Close' : 'Add'}
                        </p>
                        <p className=''>You have not set up this type of address yet.</p>

                        {editingShipping && (
                            <div className="address-form-container">
                                <form className="address-form">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>First Name *</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Last Name *</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Company Name (optional)</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Street Address *</label>
                                        <input type="text" className="form-control" placeholder="House number and street name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Apartment, suite, unit, etc. (optional)" />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>City *</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Province *</label>
                                            <select className="form-control" style={{ height: 'auto' }}>
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
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Country *</label>
                                            <input type="text" className="form-control" defaultValue="Canada" readOnly />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone *</label>
                                        <input type="tel" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address *</label>
                                        <input type="email" className="form-control" />
                                    </div>
                                    <div className="form-actions">
                                        <button type="submit" className="btn-save-address">Save Address</button>
                                        <button type="button" className="btn-cancel" onClick={() => setEditingShipping(false)}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addresses;
