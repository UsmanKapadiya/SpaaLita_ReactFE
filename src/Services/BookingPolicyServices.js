import requests from "./api.js";

const API_BASE = '/booking-policies';

export const getBookingPolicy = async () => {
  try {
    let url = `${API_BASE}`;
    return await requests.get(url);
  } catch (error) {
    return { success: false, error: error.message || 'Failed to fetch products' };
  }
};