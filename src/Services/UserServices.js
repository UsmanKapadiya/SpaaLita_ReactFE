import requests from "./api.js";

const USER_API_BASE = '/users';
const ORDER_API_BASE = '/orders'


export const userLogin = async (data) => {
    try {
        let url = `${USER_API_BASE}/login`
        return await requests.post(url, data);
    } catch (error) {
        return { success: false, error: error.message || 'Failed to fetch products' };
    }
};

export const updateUserAddress = async (id,data) => {
    try {
        let url = `${USER_API_BASE}/${id}/addresses`
        return await requests.put(url, data);
    } catch (error) {
        return { success: false, error: error.message || 'Failed to fetch products' };
    }
};

export const updateUser = async (id,data) => {
    try {
        let url = `${USER_API_BASE}/${id}`
        return await requests.put(url, data);
    } catch (error) {
        return { success: false, error: error.message || 'Failed to fetch products' };
    }
};

export const getUserOrder = async (page, itemPerPage) => {
    try {
        let url = `${ORDER_API_BASE}?page=${page}&limit=${itemPerPage}`;
        return await requests.get(url);
    } catch (error) {
        return { success: false, error: error.message || 'Failed to fetch products' };
    }
};

export const orderPlaced = async (data) => {
    try {
        let url = `${ORDER_API_BASE}`
        return await requests.post(url, data);
    } catch (error) {
        return { success: false, error: error.message || 'Failed to fetch products' };
    }
};

