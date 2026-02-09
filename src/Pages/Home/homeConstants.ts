import Logo from '../../assets/images/SpaAlita_logo.png'
import HomeBanner from '../../assets/images/home-banner.jpg'

// Storage keys
export const STORAGE_KEYS = {
  HOME_MODAL_SHOWN: 'homeModalShown',
} as const;

// URLs and assets
export const HOME_URLS = {
  LOGO: Logo,
  BANNER: HomeBanner,
  MONTHLY_SPECIAL: 'https://spaalita.ca/wp-content/uploads/2026/01/2026-FebSpecials-1024x1024.png',
  GOOGLE_MAPS_EMBED: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDv4daZyOfRCdRf1YtyD6hUHNe5Aeep-BM&q=101-745 Goldstream Ave,Victoria,BC,V9B 2X4',
} as const;



export const BUSINESS_HOURS = [
  { day: 'Monday', hours: '9:00 AM - 7:30 PM' },
  { day: 'Tuesday', hours: '9:00 AM - 7:30 PM' },
  { day: 'Wednesday', hours: '9:00 AM - 7:30 PM' },
  { day: 'Thursday', hours: '9:00 AM - 7:30 PM' },
  { day: 'Friday', hours: '9:00 AM - 7:30 PM' },
  { day: 'Saturday', hours: '9:30 AM - 7:30 PM' },
  { day: 'Sunday', hours: '9:30 AM - 7:30 PM' },
];

// Content
export const CONTENT = {
  WHO_WE_ARE: {
    TITLE: 'WHO WE ARE',
    SUBTITLE: 'Committed to Beauty and Wellness',
    DESCRIPTION: `At Spa A'lita, we are committed to creating an "Oasis" where the stresses of everyday life are left behind and your well being is nurtured and protected. It is our goal to continually educate our clients in the latest trends and technologies in the health and beauty industry and to expand these resources into a beautiful, tranquil and quality service environment, for all those in need of pampering.`,
  },
  GIFT_CARD: {
    TITLE: "Spa A'lita Gift Cards",
    DESCRIPTION: 'Purchase one of our gift cards securely online through Paypal and we will send the gift card directly to you or your loved one!',
    BUTTON_TEXT: 'Purchase',
  },
  BUSINESS_HOURS: {
    TITLE: 'REGULAR BUSINESS HOURS:',
    NOTE: 'Please call us to inquire if you would like to schedule an appointment outside of our opening hours or on a statutory holiday.',
  },
} as const;
