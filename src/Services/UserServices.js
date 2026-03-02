import requests from "./api.js";

const USER_API_BASE = '/users/login';
const ORDER_API_BASE = '/orders'


export const getAllGiftCard = async (page, itemPerPage, sorting) => {
  try {
    let url = `${GIFTCARD_API_BASE}?page=${page}&limit=${itemPerPage}`;
    const params = [];
    if (sorting) params.push(`sort=${encodeURIComponent(sorting)}`);
    if (params.length) url += `&${params.join('&')}`;
    return await requests.get(url);
  } catch (error) {
    return { success: false, error: error.message || 'Failed to fetch products' };
  }
};

export const userLogin = async (data) => {
    try {
        let url = `${USER_API_BASE}`
        return await requests.post(url, data);
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