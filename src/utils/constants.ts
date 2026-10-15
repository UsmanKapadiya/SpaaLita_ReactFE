// Timeout duration for cart success messages (in milliseconds)
export const CART_MESSAGE_TIMEOUT = 5000;

// Image dimensions
export const THUMBNAIL_DIMENSIONS = {
    width: 180,
    height: 180,
} as const;

export const PRODUCT_IMAGE_DIMENSIONS = {
    width: 459,
    height: 612,
} as const;

// Spa contact details (header, footer, contact section)
export const CONTACT_INFO = {
    ADDRESS: '101-745 Goldstream Ave,Victoria,BC,V9B 2X4',
    EMAIL: 'spaalitaoffice@shaw.ca',
    PHONE: '(250) 478-2252',
} as const;

export const GOOGLE_MAPS_EMBED = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDv4daZyOfRCdRf1YtyD6hUHNe5Aeep-BM&q=${CONTACT_INFO.ADDRESS}`;

// Fresha online booking
export const FRESHA_BOOK_NOW_URL = 'https://www.fresha.com/book-now/spa-alita-v6pl5cct/services?lid=1090026&pId=1033567';

export const BOOK_NOW_URL = 'https://www.fresha.com/a/spa-alita-victoria-745-goldstream-avenue-dy6qaqva/booking?menu=true&pId=1033567&dppub=true';
const bookingCart = (cartId: string) => `${BOOK_NOW_URL}&cartId=${cartId}`;

export const FACIALS_BOOK_NOW_URL = bookingCart('cc4c1338-eb6c-41c6-b847-915f17bff6c0');
export const MASSAGE_BOOK_NOW_URL = bookingCart('ae448754-d145-4967-bc81-f1c2399e3bfa');
export const ACUPRESSURE_BOOK_NOW_URL = bookingCart('0673dd4d-fe0e-429f-b612-0a2b3c65c679');
export const MANICURE_BOOK_NOW_URL = bookingCart('fb7949fc-598e-4857-8da7-4e0d69fb2cdb');
export const BODYTREATMENT_BOOK_NOW_URL = bookingCart('e6ef4eb3-6a95-48d4-8f55-e256986845b7');
export const WAXING_BOOK_NOW_URL = bookingCart('2040c393-6756-48b3-bb64-0495365c5204');
export const LASER_BOOK_NOW_URL = bookingCart('5e803e3b-c7a5-47c9-b2ac-8a09c0dc93f9');
export const BROW_BOOK_NOW_URL = bookingCart('80d46ea4-d25d-4c1e-8480-b313f7cdbccf');
export const SPAA_BOOK_NOW_URL = bookingCart('2723d027-d0f7-4409-a374-2f515fb1bdde');
export const MONTHLY_BOOK_NOW_URL = bookingCart('807a6964-5582-4942-be4d-3ddc04e931db');
export const BOOKING_POLICY = bookingCart('da9b86ef-fae8-4a8e-b0aa-9ba8068777b8');

// Sort options of the shop / gift card listings
export const PRODUCT_SORT_OPTIONS = [
    { value: 'menu_order', label: 'Recommended' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'date', label: 'Latest' },
    { value: 'price', label: 'Price: low to high' },
    { value: 'price-desc', label: 'Price: high to low' },
] as const;
