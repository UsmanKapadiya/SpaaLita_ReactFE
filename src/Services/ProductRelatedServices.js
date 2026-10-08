import requests, { toErrorResult } from "./api.js";
import { resolveImageUrl } from "../utils/apiConfig";

const GIFTCARD_API_BASE = '/giftcards';
const PRODUCT_API_BASE = '/products';
const COUPON_API_BASE = '/coupon/apply'

// Shop sort options -> sort keys of the backend catalogue endpoints
const SORT_PARAMS = {
  menu_order: 'recommended',
  popularity: 'popular',
  date: 'latest',
  price: 'price_low_high',
  'price-desc': 'price_high_low',
};

// productImages arrive as file names or full URLs; make them all loadable URLs
const withImageUrls = (item) =>
  item ? { ...item, productImages: (item.productImages || []).map((img) => resolveImageUrl(img, 'products')) } : item;

const withImageUrlsData = (response) => {
  if (!response?.success) return response;
  const data = Array.isArray(response.data) ? response.data.map(withImageUrls) : withImageUrls(response.data);
  return { ...response, data };
};

const catalogueUrl = (base, page, itemPerPage, sorting) => {
  let url = `${base}?page=${page}&limit=${itemPerPage}`;
  if (sorting) url += `&sort=${encodeURIComponent(SORT_PARAMS[sorting] || sorting)}`;
  return url;
};

export const getAllGiftCard = async (page, itemPerPage, sorting) => {
  try {
    return withImageUrlsData(await requests.get(catalogueUrl(GIFTCARD_API_BASE, page, itemPerPage, sorting)));
  } catch (error) {
    return toErrorResult(error, 'Failed to fetch gift cards');
  }
};

export const getGiftCardById = async (id) => {
  try {
    return withImageUrlsData(await requests.get(`${GIFTCARD_API_BASE}/${id}`));
  } catch (error) {
    return toErrorResult(error, 'Failed to fetch gift card');
  }
};

export const getGiftCardRelatedProducts = async (id) => {
  try {
    return withImageUrlsData(await requests.get(`${GIFTCARD_API_BASE}/${id}/related`));
  } catch (error) {
    return toErrorResult(error, 'Failed to fetch related gift cards');
  }
};


//Products

export const getAllProducts = async (page, itemPerPage, sorting) => {
  try {
    return withImageUrlsData(await requests.get(catalogueUrl(PRODUCT_API_BASE, page, itemPerPage, sorting)));
  } catch (error) {
    return toErrorResult(error, 'Failed to fetch products');
  }
};

export const getProductById = async (id) => {
  try {
    return withImageUrlsData(await requests.get(`${PRODUCT_API_BASE}/${id}`));
  } catch (error) {
    return toErrorResult(error, 'Failed to fetch product');
  }
};

export const getRelatedProducts = async (id) => {
  try {
    return withImageUrlsData(await requests.get(`${PRODUCT_API_BASE}/${id}/related`));
  } catch (error) {
    return toErrorResult(error, 'Failed to fetch related products');
  }
};

export const applyCoupon = async (data) => {
  try {
    return await requests.post(COUPON_API_BASE, data);
  } catch (error) {
    return toErrorResult(error, 'Failed to apply coupon');
  }
};
