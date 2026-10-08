import requests, { toErrorResult } from "./api.js";

const CONTACT_API_BASE = '/contact';

export const contactSubmit = async (data) => {
    try {
        return await requests.post(CONTACT_API_BASE, data);
    } catch (error) {
        return toErrorResult(error, "Failed to Submit Form");
    }
};
