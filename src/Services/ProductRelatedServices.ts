import requests, { toErrorResult, type ApiResponse } from './api';
import { resolveImageUrl } from '../utils/apiConfig';

const GIFTCARD_API_BASE = '/giftcards';
const PRODUCT_API_BASE = '/products';
const COUPON_API_BASE = '/coupon/apply';

// Shop sort options -> sort keys of the backend catalogue endpoints
const SORT_PARAMS: Record<string, string> = {
  menu_order: 'recommended',
  popularity: 'popular',
  date: 'latest',
  price: 'price_low_high',
  'price-desc': 'price_high_low',
};

// productImages arrive as file names or full URLs; make them all loadable URLs
const withImageUrls = (item: any) =>
  item ? { ...item, productImages: (item.productImages || []).map((img: string) => resolveImageUrl(img, 'products')) } : item;

const withImageUrlsData = (response: ApiResponse): ApiResponse => {
  if (!response?.success) return response;
  const data = Array.isArray(response.data) ? response.data.map(withImageUrls) : withImageUrls(response.data);
  return { ...response, data };
};

const catalogueUrl = (base: string, page: number, itemPerPage: number, sorting?: string, category?: string) => {
  let url = `${base}?page=${page}&limit=${itemPerPage}`;
  if (sorting) url += `&sort=${encodeURIComponent(SORT_PARAMS[sorting] || sorting)}`;
  // Category id: items in that category or any of its sub-categories
  if (category) url += `&category=${encodeURIComponent(category)}`;
  return url;
};

/** Category in the shop sidebar: `count` items are listed when it is selected */
export interface CatalogCategory {
  _id: string;
  name: string;
  slug: string;
  count: number;
  children: CatalogCategory[];
}

// Gift cards

export const getAllGiftCard = async (page: number, itemPerPage: number, sorting?: string, category?: string) => {
  try {
    return withImageUrlsData(await requests.get(catalogueUrl(GIFTCARD_API_BASE, page, itemPerPage, sorting, category)));
  } catch (error) {
    return toErrorResult(error, 'Failed to fetch gift cards');
  }
};

/** Categories that contain gift cards (sidebar of the Gift Card page) */
export const getGiftCardCategories = async (): Promise<ApiResponse<CatalogCategory[]>> => {
  try {
    return await requests.get(`${GIFTCARD_API_BASE}/categories`);
  } catch (error) {
    return toErrorResult(error, 'Failed to fetch gift card categories');
  }
};

export const getGiftCardById = async (id: string) => {
  try {
    return withImageUrlsData(await requests.get(`${GIFTCARD_API_BASE}/${id}`));
  } catch (error) {
    return toErrorResult(error, 'Failed to fetch gift card');
  }
};

export const getGiftCardRelatedProducts = async (id: string) => {
  try {
    return withImageUrlsData(await requests.get(`${GIFTCARD_API_BASE}/${id}/related`));
  } catch (error) {
    return toErrorResult(error, 'Failed to fetch related gift cards');
  }
};

// Products

export const getAllProducts = async (page: number, itemPerPage: number, sorting?: string, category?: string) => {
  try {
    return withImageUrlsData(await requests.get(catalogueUrl(PRODUCT_API_BASE, page, itemPerPage, sorting, category)));
  } catch (error) {
    return toErrorResult(error, 'Failed to fetch products');
  }
};

/** Categories that contain products (sidebar of the Shop page) */
export const getProductCategories = async (): Promise<ApiResponse<CatalogCategory[]>> => {
  try {
    return await requests.get(`${PRODUCT_API_BASE}/categories`);
  } catch (error) {
    return toErrorResult(error, 'Failed to fetch product categories');
  }
};

export const getProductById = async (id: string) => {
  try {
    return withImageUrlsData(await requests.get(`${PRODUCT_API_BASE}/${id}`));
  } catch (error) {
    return toErrorResult(error, 'Failed to fetch product');
  }
};

export const getRelatedProducts = async (id: string) => {
  try {
    return withImageUrlsData(await requests.get(`${PRODUCT_API_BASE}/${id}/related`));
  } catch (error) {
    return toErrorResult(error, 'Failed to fetch related products');
  }
};

// Coupons

export const applyCoupon = async (data: unknown) => {
  try {
    return await requests.post(COUPON_API_BASE, data);
  } catch (error) {
    return toErrorResult(error, 'Failed to apply coupon');
  }
};
