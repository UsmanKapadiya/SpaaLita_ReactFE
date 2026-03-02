import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Badge from '@mui/material/Badge';
import { useAppSelector } from '../../store/hooks';
import logo from '../../assets/images/SpaAlita_logo.png';
import PersonIcon from '@mui/icons-material/Person';
import './Header.css'

const Header: FC = () => {
  const navigate = useNavigate();
  const isUserLogin = useAppSelector(state => state.auth.isLoggedIn);
  // Memoize cart count calculation for performance
  const cartItemsCount = useAppSelector(state =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  // Memoize navigation handler to prevent unnecessary re-renders
  const handleNavigation = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  // Memoize badge styles to prevent recreation on each render
  const badgeStyles = useMemo(() => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#000',
      color: 'white',
      right: -8,
      top: 3
    }
  }), []);

  return (
    <header id="nav-header">
      <div className="container">
        <div className="logo-outer">
          <div onClick={() => handleNavigation('/')} className="d-inline-block" style={{ cursor: 'pointer' }}>
            <img src={logo} alt="Logo" width="210" />
          </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light pb-4">
          <button className="navbar-toggler" data-toggle="collapse" data-target="#menubar" aria-controls="menubar" aria-expanded="false" aria-label="Toggle navigation" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <div className="animated-icon3"><span></span><span></span><span></span></div>
          </button>

          <div className="collapse navbar-collapse" id="menubar">
            {/* <ul id="menu-desktop-menu" className="navbar-nav w-100 justify-content-center"> */}
              <ul
                id="menu-desktop-menu"
                className={`navbar-nav w-100 justify-content-center ${isUserLogin ? 'user-logged-in' : ''}`}
              >
              <li id="menu-item-17492" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-17492"><span onClick={() => handleNavigation('/')} style={{ cursor: 'pointer' }}>Home</span></li>
              <li id="menu-item-14584" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-14584"><a href="https://www.fresha.com/book-now/spa-alita-v6pl5cct/services?lid=1090026&amp;pId=1033567" target="_blank" rel="noopener noreferrer">Book NOW!</a></li>
              <li id="menu-item-1929" className="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-209 current_page_item menu-item-has-children menu-item-1929"><span onClick={() => handleNavigation('/services')} style={{ cursor: 'pointer' }} aria-current="page">Services</span>
                <ul className="sub-menu">
                  <li id="menu-item-208" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-208"><span onClick={() => handleNavigation('/facials')} style={{ cursor: 'pointer' }}>Facials</span></li>
                  <li id="menu-item-207" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-207"><span onClick={() => handleNavigation('/massages')} style={{ cursor: 'pointer' }}>Massages</span></li>
                  <li id="menu-item-206" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-206"><span onClick={() => handleNavigation('/acupressure')} style={{ cursor: 'pointer' }}>Acupressure</span></li>
                  <li id="menu-item-201" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-201"><span onClick={() => handleNavigation('/manicures-and-pedicures')} style={{ cursor: 'pointer' }}>Manicures and Pedicures</span></li>
                  <li id="menu-item-205" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-205"><span onClick={() => handleNavigation('/body-treatments')} style={{ cursor: 'pointer' }}>Body Treatments</span></li>
                  <li id="menu-item-203" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-203"><span onClick={() => handleNavigation('/waxing')} style={{ cursor: 'pointer' }}>Waxing</span></li>
                  <li id="menu-item-11766" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11766"><span onClick={() => handleNavigation('/laser-hair-removal')} style={{ cursor: 'pointer' }}>Laser Hair Removal</span></li>
                  <li id="menu-item-200" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-200"><span onClick={() => handleNavigation('/brows-and-lashes')} style={{ cursor: 'pointer' }}>Brows and Lashes</span></li>
                  <li id="menu-item-199" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-199"><span onClick={() => handleNavigation('/spa-packages')} style={{ cursor: 'pointer' }}>Spa Packages</span></li>
                </ul>
              </li>
              <li id="menu-item-2497" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-2497"><span onClick={() => handleNavigation('/giftcard')} style={{ cursor: 'pointer' }}>Gift Card</span></li>
              <li id="menu-item-24" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-24"><span onClick={() => handleNavigation('/shop')} style={{ cursor: 'pointer' }}>Shop</span></li>
              <li id="menu-item-2026" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2026"><span onClick={() => handleNavigation('/monthly-specials')} style={{ cursor: 'pointer' }}>Monthly Specials</span></li>
              <li id="menu-item-396" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-396"><span onClick={() => handleNavigation('/contact')} style={{ cursor: 'pointer' }}>Contact</span></li>
              <li id="menu-item-1925" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1925"><span onClick={() => handleNavigation('/spa-policy')} style={{ cursor: 'pointer' }}>Booking Policy</span></li>
              <li id="menu-item-472" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-472"><span onClick={() => handleNavigation('/gallery')} style={{ cursor: 'pointer' }}>Gallery</span></li>
              <li className="menu-item">
                <div
                  onClick={() => handleNavigation('/cart')}
                  className="d-flex align-items-center"
                  style={{ cursor: 'pointer' }}
                >
                  <span className="mr-2">Cart</span>
                  <Badge
                    badgeContent={cartItemsCount}
                    sx={badgeStyles}
                  >
                    <LocalMallIcon className='cartIconColor' />
                  </Badge>
                </div>
              </li>
              {isUserLogin && (
                <li className="menu-item">
                  <div
                    onClick={() => handleNavigation('/cart')}
                    className="d-flex align-items-center"
                    style={{ cursor: 'pointer' }}
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
