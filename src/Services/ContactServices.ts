import requests, { toErrorResult } from './api';

const CONTACT_API_BASE = '/contact';

export const contactSubmit = async (data: unknown) => {
  try {
    return await requests.post(CONTACT_API_BASE, data);
  } catch (error) {
    return toErrorResult(error, 'Failed to Submit Form');
  }
};
