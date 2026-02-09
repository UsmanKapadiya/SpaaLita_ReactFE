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
