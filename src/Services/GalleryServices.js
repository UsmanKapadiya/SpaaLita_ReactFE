import requests, { toErrorResult } from "./api.js";
import { resolveImageUrl } from "../utils/apiConfig";

const API_BASE = '/gallery';

export const getAllGallery = async () => {
  try {
    const response = await requests.get(API_BASE);
    if (!response?.success || !Array.isArray(response.data)) return response;
    return {
      ...response,
      data: response.data.map((item) => ({ ...item, url: resolveImageUrl(item.url, 'gallery') })),
    };
  } catch (error) {
    return toErrorResult(error, 'Failed to fetch gallery');
  }
};
