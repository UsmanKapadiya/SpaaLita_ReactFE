// @ts-nocheck
import Facials from '../../assets/images/Facial.jpg';
import Massage from '../../assets/images/massage.jpg';
import Acupressure from '../../assets/images/accupressure.jpg';
import Manicure from '../../assets/images/manicure.jpg';
import BodyTreatment from '../../assets/images/bodyTreatment.jpg';
import Waxing from '../../assets/images/waxing.jpg';
import Laser from '../../assets/images/Laser.jpg';
import Brow from '../../assets/images/browes.jpeg';
import Spa from '../../assets/images/spaa.jpg';

export const BOOK_NOW_URL = 'https://www.fresha.com/a/spa-alita-victoria-745-goldstream-avenue-dy6qaqva/booking?menu=true&pId=1033567&dppub=true'
export const FACIALS_BOOK_NOW_URL= 'https://www.fresha.com/a/spa-alita-victoria-745-goldstream-avenue-dy6qaqva/booking?menu=true&pId=1033567&dppub=true&cartId=cc4c1338-eb6c-41c6-b847-915f17bff6c0'
export const MASSAGE_BOOK_NOW_URL= 'https://www.fresha.com/a/spa-alita-victoria-745-goldstream-avenue-dy6qaqva/booking?menu=true&pId=1033567&dppub=true&cartId=ae448754-d145-4967-bc81-f1c2399e3bfa'
export const ACUPRESSURE_BOOK_NOW_URL = 'https://www.fresha.com/a/spa-alita-victoria-745-goldstream-avenue-dy6qaqva/booking?menu=true&pId=1033567&dppub=true&cartId=0673dd4d-fe0e-429f-b612-0a2b3c65c679'
export const MANICURE_BOOK_NOW_URL = 'https://www.fresha.com/a/spa-alita-victoria-745-goldstream-avenue-dy6qaqva/booking?menu=true&pId=1033567&dppub=true&cartId=fb7949fc-598e-4857-8da7-4e0d69fb2cdb'
export const BODYTREATMENT_BOOK_NOW_URL= 'https://www.fresha.com/a/spa-alita-victoria-745-goldstream-avenue-dy6qaqva/booking?menu=true&pId=1033567&dppub=true&cartId=e6ef4eb3-6a95-48d4-8f55-e256986845b7'
export const WAXING_BOOK_NOW_URL = 'https://www.fresha.com/a/spa-alita-victoria-745-goldstream-avenue-dy6qaqva/booking?menu=true&pId=1033567&dppub=true&cartId=2040c393-6756-48b3-bb64-0495365c5204'
export const LASER_BOOK_NOW_URL = 'https://www.fresha.com/a/spa-alita-victoria-745-goldstream-avenue-dy6qaqva/booking?menu=true&pId=1033567&dppub=true&cartId=5e803e3b-c7a5-47c9-b2ac-8a09c0dc93f9'
export const BROW_BOOK_NOW_URL = 'https://www.fresha.com/a/spa-alita-victoria-745-goldstream-avenue-dy6qaqva/booking?menu=true&pId=1033567&dppub=true&cartId=80d46ea4-d25d-4c1e-8480-b313f7cdbccf'
export const SPAA_BOOK_NOW_URL = 'https://www.fresha.com/a/spa-alita-victoria-745-goldstream-avenue-dy6qaqva/booking?menu=true&pId=1033567&dppub=true&cartId=2723d027-d0f7-4409-a374-2f515fb1bdde'

export const SERVICES_HERO_IMAGE = 'https://spaalita.ca/wp-content/uploads/2021/06/services.jpg';

export const SERVICES_HERO_CONTENT = {
  TITLE: 'OUR SERVICES',
  SUBTITLE: 'Treatments You Can Trust',
};

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
