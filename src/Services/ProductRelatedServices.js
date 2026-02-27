import requests from "./api.js";

const GIFTCARD_API_BASE = '/giftcards';
const PRODUCT_API_BASE = '/products';

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

export const getGiftCardRelatedProducts = async (id) => {
  console.log(id)
  try {
    let url = `${GIFTCARD_API_BASE}/${id}/related`;
    return await requests.get(url);
  } catch (error) {
    return { success: false, error: error.message || 'Failed to fetch products' };
  }
};


//Products

export const getAllProducts = async (page, itemPerPage, sorting) => {
  try {
    let url = `${PRODUCT_API_BASE}?page=${page}&limit=${itemPerPage}`;
    const params = [];
    if (sorting) params.push(`sort=${encodeURIComponent(sorting)}`);
    if (params.length) url += `&${params.join('&')}`;
    return await requests.get(url);
  } catch (error) {
    return { success: false, error: error.message || 'Failed to fetch products' };
  }
};

export const getRelatedProducts = async (id) => {
  console.log(id)
  try {
    let url = `${PRODUCT_API_BASE}/${id}/related`;
    return await requests.get(url);
  } catch (error) {
    return { success: false, error: error.message || 'Failed to fetch products' };
  }
};

