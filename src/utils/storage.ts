/**
 * Utility functions for localStorage operations
 * Provides type-safe and centralized storage management
 */

export const storage = {
  /**
   * Get an item from localStorage
   * @param key - Storage key
   * @returns The stored value or null if not found
   */
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return null;
    }
  },

  /**
   * Set an item in localStorage
   * @param key - Storage key
   * @param value - Value to store
   * @returns true if successful, false otherwise
   */
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage: ${key}`, error);
      return false;
    }
  },

  /**
   * Remove an item from localStorage
   * @param key - Storage key
   * @returns true if successful, false otherwise
   */
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage: ${key}`, error);
      return false;
    }
  },

  /**
   * Check if a key exists in localStorage
   * @param key - Storage key
   * @returns true if key exists, false otherwise
   */
  hasItem: (key: string): boolean => {
    return localStorage.getItem(key) !== null;
  },

  /**
   * Get and parse JSON from localStorage
   * @param key - Storage key
   * @returns Parsed object or null if not found or invalid JSON
   */
  getJSON: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error parsing JSON from localStorage: ${key}`, error);
      return null;
    }
  },

  /**
   * Stringify and store JSON in localStorage
   * @param key - Storage key
   * @param value - Value to store
   * @returns true if successful, false otherwise
   */
  setJSON: <T>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error stringifying JSON to localStorage: ${key}`, error);
      return false;
    }
  }
};
