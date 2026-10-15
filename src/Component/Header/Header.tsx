import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Badge from '@mui/material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import { useAppSelector } from '../../store/hooks';
import { FRESHA_BOOK_NOW_URL } from '../../utils/constants';
import logo from '../../assets/images/SpaAlita_logo.png';
import './Header.css'

interface NavLink {
  label: string;
  path: string;
}

const SERVICE_LINKS: NavLink[] = [
  { label: 'Facials', path: '/facials' },
  { label: 'Massages', path: '/massages' },
  { label: 'Acupressure', path: '/acupressure' },
  { label: 'Manicures and Pedicures', path: '/manicures-and-pedicures' },
  { label: 'Body Treatments', path: '/body-treatments' },
  { label: 'Waxing', path: '/waxing' },
  { label: 'Laser Hair Removal', path: '/laser-hair-removal' },
  { label: 'Brows and Lashes', path: '/brows-and-lashes' },
  { label: 'Spa Packages', path: '/spa-packages' },
];

// Menu entries after "Services"
const PAGE_LINKS: NavLink[] = [
  { label: 'Gift Card', path: '/giftcard' },
  { label: 'Shop', path: '/shop' },
  { label: 'Monthly Specials', path: '/monthly-specials' },
  { label: 'Contact', path: '/contact' },
  { label: 'Booking Policy', path: '/spa-policy' },
  { label: 'Gallery', path: '/gallery' },
];

const clickable = { cursor: 'pointer' } as const;

const badgeStyles = {
  '& .MuiBadge-badge': {
    backgroundColor: '#000',
    color: 'white',
    right: -8,
    top: 3
  }
};

const Header: FC = () => {
  const navigate = useNavigate();
  const isUserLogin = useAppSelector(state => state.auth.isLoggedIn);
  const cartItemsCount = useAppSelector(state =>
    state.cart.items.reduce((total, item) => total + item.qty, 0)
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = useCallback((path: string) => {
    navigate(path);
    setMenuOpen(false);
  }, [navigate]);

  const renderLink = ({ label, path }: NavLink) => (
    <li key={path} className="menu-item">
      <span onClick={() => handleNavigation(path)} style={clickable}>{label}</span>
    </li>
  );

  return (
    <header id="nav-header">
      <div className="container">
        <div className="logo-outer">
          <div onClick={() => handleNavigation('/')} className="d-inline-block" style={clickable}>
            <img src={logo} alt="Logo" width="210" />
          </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light pb-4">
          <button
            className="navbar-toggler"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle navigation"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <div className={`animated-icon3 ${menuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <div className={`navbar-collapse ${menuOpen ? "show-menu" : "hide-menu"}`} id="menubar">
            <ul
              id="menu-desktop-menu"
              className={`navbar-nav w-100 justify-content-center ${isUserLogin ? 'user-logged-in' : ''}`}
            >
              {renderLink({ label: 'Home', path: '/' })}
              <li className="menu-item">
                <a href={FRESHA_BOOK_NOW_URL} target="_blank" rel="noopener noreferrer">Book NOW!</a>
              </li>
              <li className="menu-item menu-item-has-children">
                <span onClick={() => handleNavigation('/services')} style={clickable}>Services</span>
                <ul className="sub-menu">
                  {SERVICE_LINKS.map(renderLink)}
                </ul>
              </li>
              {PAGE_LINKS.map(renderLink)}
              <li className="menu-item">
                <div
                  onClick={() => handleNavigation('/cart')}
                  className="d-flex align-items-center"
                  style={clickable}
                >
                  <span className="mr-2">Cart</span>
                  <Badge badgeContent={cartItemsCount} sx={badgeStyles}>
                    <LocalMallIcon className='cartIconColor' />
                  </Badge>
                </div>
              </li>
              {isUserLogin && (
                <li className="menu-item">
                  <div
                    onClick={() => handleNavigation('/my-account')}
                    className="d-flex align-items-center"
                    style={clickable}
                  >
                    <PersonIcon className='cartIconColor' />
                  </div>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
