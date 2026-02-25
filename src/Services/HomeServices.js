import requests from "./api.js";

const API_BASE = '/monthly-special';

export const getAllMonthlySpecial = async (searchTerm) => {
  try {
    let url = `${API_BASE}?page=${1}&limit=${1}`;
    const params = [];
    if (searchTerm) params.push(`search=${encodeURIComponent(searchTerm)}`);
    if (params.length) url += `&${params.join('&')}`;
    return await requests.get(url);
  } catch (error) {
    return { success: false, error: error.message || 'Failed to fetch products' };
  }
};