import requests from "./api.js";

const API_BASE = '/giftcards';

export const getAllGiftCard = async (page, itemPerPage) => {
  try {
    let url = `${API_BASE}?page=${page}&limit=${itemPerPage}`;
    return await requests.get(url);
  } catch (error) {
    return { success: false, error: error.message || 'Failed to fetch products' };
  }
};