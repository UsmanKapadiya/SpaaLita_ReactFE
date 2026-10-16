import requests, { toErrorResult } from './api';

const NEWSLETTER_API_BASE = '/newsletter';

export const subscribeNewsletter = async (email: string) => {
  try {
    return await requests.post(`${NEWSLETTER_API_BASE}/subscribe`, { email, source: 'footer' });
  } catch (error) {
    return toErrorResult(error, 'Failed to subscribe to the newsletter');
  }
};

export const unsubscribeNewsletter = async (email: string) => {
  try {
    return await requests.post(`${NEWSLETTER_API_BASE}/unsubscribe`, { email });
  } catch (error) {
    return toErrorResult(error, 'Failed to unsubscribe from the newsletter');
  }
};
