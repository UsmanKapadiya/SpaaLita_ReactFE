import requests from "./api.js";

const CONTACT_API_BASE = '/contact';

export const contactSubmit = async (data) => {
    try {
        let url = `${CONTACT_API_BASE}`
        return await requests.post(url, data);
    } catch (error) {
        return {
            success: false,
            message:
                error?.response?.data?.message ||
                error?.message ||
                "Failed to Submit Form",
        };
    }
};