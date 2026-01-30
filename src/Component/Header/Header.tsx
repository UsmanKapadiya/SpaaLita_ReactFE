import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/SpaAlita_logo.png';
import './Header.css'


const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header id="nav-header">
      <div className="container">
        <div className="logo-outer">
          <Link to="/" className="d-inline-block">
            <img src={logo} alt="Logo" width="210" />
          </Link>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light pb-4">
          <a className="navbar-toggler" data-toggle="collapse" data-target="#menubar" aria-controls="menubar" aria-expanded="false" aria-label="Toggle navigation">
            <div className="animated-icon3"><span></span><span></span><span></span></div>
          </a>

          <div className="collapse navbar-collapse" id="menubar">
            <ul id="menu-desktop-menu" className="navbar-nav w-100 justify-content-center">
              <li id="menu-item-17492" className="button-padding">
                <button className="custom-btn" type="button" onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>
                  Home
                </button>
              </li>
              <li id="menu-item-14584" className="button-padding">
                <button className="custom-btn" type="button" onClick={() => navigate('https://www.fresha.com/book-now/spa-alita-v6pl5cct/services?lid=1090026&amp;pId=1033567')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>
                  Book NOW!
                </button>
              </li>
              <li id="menu-item-1929" className="button-padding">
                <button className="custom-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>
                  Services
                </button>
                {/* <ul className="sub-menu">
                  <li id="menu-item-208" className="nav-li">
                    <button className="custom-btn" type="button" onClick={() => navigate('/facials/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>
                      Facials
                    </button>
                  </li>
                  <li id="menu-item-207" className="">
                    <button type="button" onClick={() => navigate('/massages/')} style={{ background: 'none', margin: 2, border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>
                    Massages
                    </button>
                  </li>
                  <li id="menu-item-206" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-206"><button type="button" onClick={() => navigate('/acupressure/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Acupressure</button></li>
                  <li id="menu-item-201" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-201"><button type="button" onClick={() => navigate('/manicures-and-pedicures/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Manicures and Pedicures</button></li>
                  <li id="menu-item-205" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-205"><button type="button" onClick={() => navigate('/body-treatments/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Body Treatments</button></li>
                  <li id="menu-item-203" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-203"><button type="button" onClick={() => navigate('/waxing/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Waxing</button></li>
                  <li id="menu-item-11766" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11766"><button type="button" onClick={() => navigate('/laser-hair-removal/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Laser Hair Removal</button></li>
                  <li id="menu-item-200" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-200"><button type="button" onClick={() => navigate('/brows-and-lashes/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Brows and Lashes</button></li>
                  <li id="menu-item-199" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-199"><button type="button" onClick={() => navigate('/spa-packages/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Spa Packages</button></li>
                </ul> */}
              </li>
              <li id="menu-item-2497" className="button-padding"><button className="custom-btn" type="button" onClick={() => navigate('/product-category/gift-card/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Gift Card</button></li>
              <li id="menu-item-24" className="button-padding"><button className="custom-btn" type="button" onClick={() => navigate('/shop/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Shop</button></li>
              <li id="menu-item-2026" className="button-padding"><button className="custom-btn" type="button" onClick={() => navigate('/monthly-specials/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Monthly Specials</button></li>
              <li id="menu-item-396" className="button-padding"><button className="custom-btn" type="button" onClick={() => navigate('/contact/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Contact</button></li>
              <li id="menu-item-1925" className="button-padding"><button className="custom-btn" type="button" onClick={() => navigate('/spa-policy/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Booking Policy</button></li>
              <li id="menu-item-472" className="button-padding"><button className="custom-btn" type="button" onClick={() => navigate('/gallery/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Gallery</button></li>
              <li className="menu-item d-flex button-padding"><button className="custom-btn" type="button" onClick={() => navigate('/cart/')} className="mr-2" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Cart</button><button type="button" onClick={() => navigate('/cart/')} className="cart-contents" title="My cart" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>
              </button></li>
            </ul>              </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
