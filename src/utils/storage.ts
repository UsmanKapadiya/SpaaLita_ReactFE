/**
 * Utility functions for localStorage / sessionStorage operations
 * Provides type-safe and centralized storage management
 */

type StorageArea = 'localStorage' | 'sessionStorage';

const createStorage = (area: StorageArea) => ({
  /**
   * Get an item from storage
   * @param key - Storage key
   * @returns The stored value or null if not found
   */
  getItem: (key: string): string | null => {
    try {
      return window[area].getItem(key);
    } catch (error) {
      console.error(`Error reading from ${area}: ${key}`, error);
      return null;
    }
  },

  /**
   * Set an item in storage
   * @param key - Storage key
   * @param value - Value to store
   * @returns true if successful, false otherwise
   */
  setItem: (key: string, value: string): boolean => {
    try {
      window[area].setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error writing to ${area}: ${key}`, error);
      return false;
    }
  },

  /**
   * Remove an item from storage
   * @param key - Storage key
   * @returns true if successful, false otherwise
   */
  removeItem: (key: string): boolean => {
    try {
      window[area].removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from ${area}: ${key}`, error);
      return false;
    }
  },

  /**
   * Check if a key exists in storage
   * @param key - Storage key
   * @returns true if key exists, false otherwise
   */
  hasItem: (key: string): boolean => {
    try {
      return window[area].getItem(key) !== null;
    } catch {
      return false;
    }
  },

  /**
   * Get and parse JSON from storage
   * @param key - Storage key
   * @returns Parsed object or null if not found or invalid JSON
   */
  getJSON: <T>(key: string): T | null => {
    try {
      const item = window[area].getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error parsing JSON from ${area}: ${key}`, error);
      return null;
    }
  },

  /**
   * Stringify and store JSON in storage
   * @param key - Storage key
   * @param value - Value to store
   * @returns true if successful, false otherwise
   */
  setJSON: <T>(key: string, value: T): boolean => {
    try {
      window[area].setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error stringifying JSON to ${area}: ${key}`, error);
      return false;
    }
  }
});

/** localStorage: kept across visits */
export const storage = createStorage('localStorage');

/** sessionStorage: this browser tab only, cleared when the tab is closed */
export const sessionStore = createStorage('sessionStorage');
