import Facials from '../../assets/images/Facial.jpg';
import Massage from '../../assets/images/massage.jpg';
import Acupressure from '../../assets/images/accupressure.jpg';
import Manicure from '../../assets/images/manicure.jpg';
import BodyTreatment from '../../assets/images/bodyTreatment.jpg';
import Waxing from '../../assets/images/waxing.jpg';
import Laser from '../../assets/images/Laser.jpg';
import Brow from '../../assets/images/browes.jpeg';
import Spa from '../../assets/images/spaa.jpg';
import FacialsBanner from '../../assets/images/facial_services.jpg';
import MassageBanner from '../../assets/images/massage_banner.jpg';
import AcupressureBanner from '../../assets/images/accupressureBanner.jpg';
import ManicureBanner from '../../assets/images/manicureBanner.jpg';
import BodyTreatmentBanner from '../../assets/images/bodyTreatmentBanner.jpg';
import WaxingBanner from '../../assets/images/waxingBanner.jpg';
import LaserBanner from '../../assets/images/Laser-HairBanner.jpg';
import BrowsBanner from '../../assets/images/browsBanner.jpg';
import SpaBanner from '../../assets/images/SpaaBanner.jpg';
import {
  ACUPRESSURE_BOOK_NOW_URL,
  BODYTREATMENT_BOOK_NOW_URL,
  BROW_BOOK_NOW_URL,
  FACIALS_BOOK_NOW_URL,
  LASER_BOOK_NOW_URL,
  MANICURE_BOOK_NOW_URL,
  MASSAGE_BOOK_NOW_URL,
  SPAA_BOOK_NOW_URL,
  WAXING_BOOK_NOW_URL,
} from '../../utils/constants';

export const SERVICES_HERO_IMAGE = 'https://spaalita.ca/wp-content/uploads/2021/06/services.jpg';

export const SERVICES_HERO_CONTENT = {
  TITLE: 'OUR SERVICES',
  SUBTITLE: 'Treatments You Can Trust',
};

// Cards of the /services overview page
export interface ServiceItem {
  title: string;
  image: string;
  alt: string;
  link: string;
  backgroundClass: string;
  textClass?: string;
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    title: 'FACIALS',
    image: Facials,
    alt: 'Facial treatments',
    link: 'facials/',
    backgroundClass: 'background-grey',
  },
  {
    title: 'MASSAGE',
    image: Massage,
    alt: 'Massage therapy',
    link: 'massages/',
    backgroundClass: 'background-light',
    textClass: 'text-black',
  },
  {
    title: 'ACUPRESSURE',
    image: Acupressure,
    alt: 'Acupressure treatment',
    link: 'acupressure/',
    backgroundClass: 'background-grey',
    textClass: 'text-white',
  },
  {
    title: 'MANICURE & PEDICURE',
    image: Manicure,
    alt: 'Manicure and Pedicure',
    link: 'manicures-and-pedicures/',
    backgroundClass: 'background-light',
    textClass: 'text-black',
  },
  {
    title: 'BODY TREATMENTS',
    image: BodyTreatment,
    alt: 'Body treatments',
    link: 'body-treatments/',
    backgroundClass: 'background-grey',
  },
  {
    title: 'WAXING',
    image: Waxing,
    alt: 'Waxing services',
    link: 'waxing/',
    backgroundClass: 'background-light',
  },
  {
    title: 'LASER HAIR REMOVAL',
    image: Laser,
    alt: 'Laser hair removal',
    link: 'Laser-Hair-Removal/',
    backgroundClass: 'background-grey',
    textClass: 'text-white',
  },
  {
    title: 'BROW & LASHES',
    image: Brow,
    alt: 'Brow and lash services',
    link: 'brows-and-lashes/',
    backgroundClass: 'background-light',
  },
  {
    title: 'SPA PACKAGES',
    image: Spa,
    alt: 'Spa packages',
    link: 'spa-packages/',
    backgroundClass: 'background-grey',
  },
];

// One detail page per service. Content comes from the /services API (looked up
// by searchTerm); the values here are the fallbacks while it loads or is missing.
export interface ServiceDetail {
  path: string;
  aliases?: string[];
  searchTerm: string;
  title: string;
  bookNowUrl: string;
  bannerImage: string;
  bannerAlt: string;
  bannerWidth: number;
  bannerHeight: number;
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    path: '/facials',
    aliases: ['/services/facials'],
    searchTerm: 'facials',
    title: 'FACIALS',
    bookNowUrl: FACIALS_BOOK_NOW_URL,
    bannerImage: FacialsBanner,
    bannerAlt: "Facial treatments at Spa A'lita",
    bannerWidth: 400,
    bannerHeight: 400,
  },
  {
    path: '/massages',
    searchTerm: 'Massage',
    title: 'MASSAGE',
    bookNowUrl: MASSAGE_BOOK_NOW_URL,
    bannerImage: MassageBanner,
    bannerAlt: "Massage therapy at Spa A'lita",
    bannerWidth: 506,
    bannerHeight: 284,
  },
  {
    path: '/acupressure',
    searchTerm: 'acupressure',
    title: 'ACUPRESSURE',
    bookNowUrl: ACUPRESSURE_BOOK_NOW_URL,
    bannerImage: AcupressureBanner,
    bannerAlt: "Acupressure treatment at Spa A'lita",
    bannerWidth: 443,
    bannerHeight: 296,
  },
  {
    path: '/manicures-and-pedicures',
    searchTerm: 'manicures-and-pedicures',
    title: 'MANICURES AND PEDICURES',
    bookNowUrl: MANICURE_BOOK_NOW_URL,
    bannerImage: ManicureBanner,
    bannerAlt: "Manicure and pedicure services at Spa A'lita",
    bannerWidth: 481,
    bannerHeight: 289,
  },
  {
    path: '/body-treatments',
    searchTerm: 'body-treatments',
    title: 'BODY TREATMENTS',
    bookNowUrl: BODYTREATMENT_BOOK_NOW_URL,
    bannerImage: BodyTreatmentBanner,
    bannerAlt: "Body treatments at Spa A'lita",
    bannerWidth: 485,
    bannerHeight: 323,
  },
  {
    path: '/waxing',
    searchTerm: 'waxing',
    title: 'WAXING',
    bookNowUrl: WAXING_BOOK_NOW_URL,
    bannerImage: WaxingBanner,
    bannerAlt: "Waxing services at Spa A'lita",
    bannerWidth: 436,
    bannerHeight: 290,
  },
  {
    path: '/laser-hair-removal',
    searchTerm: 'laser-hair-removal',
    title: 'LASER HAIR REMOVAL',
    bookNowUrl: LASER_BOOK_NOW_URL,
    bannerImage: LaserBanner,
    bannerAlt: "Laser hair removal at Spa A'lita",
    bannerWidth: 447,
    bannerHeight: 298,
  },
  {
    path: '/brows-and-lashes',
    searchTerm: 'brows-and-lashes',
    title: 'BROWS & LASHES',
    bookNowUrl: BROW_BOOK_NOW_URL,
    bannerImage: BrowsBanner,
    bannerAlt: "Brow and lash services at Spa A'lita",
    bannerWidth: 373,
    bannerHeight: 373,
  },
  {
    path: '/spa-packages',
    searchTerm: 'spa-packages',
    title: 'SPA PACKAGES',
    bookNowUrl: SPAA_BOOK_NOW_URL,
    bannerImage: SpaBanner,
    bannerAlt: "Spa packages at Spa A'lita",
    bannerWidth: 318,
    bannerHeight: 318,
  },
];
