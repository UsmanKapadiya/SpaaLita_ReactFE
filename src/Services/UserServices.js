import requests from "./api.js";

const USER_API_BASE = '/users/login';


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
        // return await requests(`${USER_API_BASE}`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data),
        // });
    } catch (error) {
        return { success: false, error: error.message || 'Failed to fetch products' };
    }
};