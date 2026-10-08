import requests, { toErrorResult } from "./api.js";
import { resolveImageUrl } from "../utils/apiConfig";

const API_BASE = '/monthly-special';

export const getAllMonthlySpecial = async (searchTerm) => {
  try {
    let url = `${API_BASE}?page=${1}&limit=${1}`;
    if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
    const response = await requests.get(url);
    if (!response?.success || !Array.isArray(response.data)) return response;
    return {
      ...response,
      data: response.data.map((item) => ({ ...item, image: resolveImageUrl(item.image) })),
    };
  } catch (error) {
    return toErrorResult(error, 'Failed to fetch monthly special');
  }
};
