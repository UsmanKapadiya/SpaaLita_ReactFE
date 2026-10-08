import requests, { toErrorResult } from "./api.js";

const USER_API_BASE = '/users';
const ORDER_API_BASE = '/orders'


export const userLogin = async (data) => {
    try {
        return await requests.post(`${USER_API_BASE}/login`, data);
    } catch (error) {
        return toErrorResult(error, "Failed to fetch login");
    }
};

export const updateUserAddress = async (id, data) => {
    try {
        return await requests.put(`${USER_API_BASE}/${id}/addresses`, data);
    } catch (error) {
        return toErrorResult(error, 'Failed to update addresses');
    }
};

export const updateUser = async (id, data) => {
    try {
        return await requests.put(`${USER_API_BASE}/${id}`, data);
    } catch (error) {
        return toErrorResult(error, 'Failed to update account');
    }
};

export const getUserOrder = async (page, itemPerPage) => {
    try {
        return await requests.get(`${ORDER_API_BASE}?page=${page}&limit=${itemPerPage}`);
    } catch (error) {
        return toErrorResult(error, 'Failed to fetch orders');
    }
};

export const orderPlaced = async (data) => {
    try {
        return await requests.post(ORDER_API_BASE, data);
    } catch (error) {
        return toErrorResult(error, 'Failed to place order');
    }
};

export const forgotPassword = async (data) => {
    try {
        return await requests.post(`${USER_API_BASE}/forgot-password`, data);
    } catch (error) {
        return toErrorResult(error, 'Failed to request a password reset');
    }
};

export const resetPassword = async (token, data) => {
    try {
        return await requests.post(`${USER_API_BASE}/reset-password/${token}`, data);
    } catch (error) {
        return toErrorResult(error, 'Failed to reset password');
    }
};
