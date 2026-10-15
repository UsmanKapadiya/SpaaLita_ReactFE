import requests, { toErrorResult } from './api';

const API_BASE = '/booking-policies';

export const getBookingPolicy = async () => {
  try {
    return await requests.get(API_BASE);
  } catch (error) {
    return toErrorResult(error, 'Failed to fetch booking policy');
  }
};
