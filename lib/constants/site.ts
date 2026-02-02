/**
 * Site-wide constants
 * Centralized configuration for the entire application
 */

export const SITE_CONFIG = {
  url: "https://mustafazahid.com",
  name: "Mustafa Zahid - Music & Events",
  phone: "+92 322 407 1299",
  whatsapp: "+923224071299",
} as const;

// Export individual constants for convenience
export const SITE_URL = SITE_CONFIG.url;
export const SITE_NAME = SITE_CONFIG.name;
export const CONTACT_PHONE = SITE_CONFIG.phone;
export const WHATSAPP_NUMBER = SITE_CONFIG.whatsapp;

