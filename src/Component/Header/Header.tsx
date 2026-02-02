import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/SpaAlita_logo.png';


const Header: React.FC = () => {
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
              <ul id="menu-desktop-menu" className="navbar-nav w-100 justify-content-center"><li id="menu-item-17492" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-17492"><a href="/">Home</a></li>
                <li id="menu-item-14584" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-14584"><a href="https://www.fresha.com/book-now/spa-alita-v6pl5cct/services?lid=1090026&amp;pId=1033567">Book NOW!</a></li>
                <li id="menu-item-1929" className="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-209 current_page_item menu-item-has-children menu-item-1929"><a href="/services/" aria-current="page">Services</a>
                  <ul className="sub-menu">
                    <li id="menu-item-208" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-208"><a href="/facials/">Facials</a></li>
                    <li id="menu-item-207" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-207"><a href="/massages/">Massages</a></li>
                    <li id="menu-item-206" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-206"><a href="/acupressure/">Acupressure</a></li>
                    <li id="menu-item-201" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-201"><a href="/manicures-and-pedicures/">Manicures and Pedicures</a></li>
                    <li id="menu-item-205" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-205"><a href="/body-treatments/">Body Treatments</a></li>
                    <li id="menu-item-203" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-203"><a href="/waxing/">Waxing</a></li>
                    <li id="menu-item-11766" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11766"><a href="/laser-hair-removal/">Laser Hair Removal</a></li>
                    <li id="menu-item-200" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-200"><a href="/brows-and-lashes/">Brows and Lashes</a></li>
                    <li id="menu-item-199" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-199"><a href="/spa-packages/">Spa Packages</a></li>
                  </ul>
                </li>
                <li id="menu-item-2497" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-2497"><a href="/giftcard">Gift Card</a></li>
                <li id="menu-item-24" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-24"><a href="/shop/">Shop</a></li>
                <li id="menu-item-2026" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2026"><a href="/monthly-specials/">Monthly Specials</a></li>
                <li id="menu-item-396" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-396"><a href="/contact/">Contact</a></li>
                <li id="menu-item-1925" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1925"><a href="/spa-policy/">Booking Policy</a></li>
                <li id="menu-item-472" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-472"><a href="/gallery/">Gallery</a></li>
                <li className="menu-item d-flex"><a href="/cart/" className="mr-2">Cart</a><a className="cart-contents" href="/cart/" title="My cart">
                </a></li>
              </ul>              </div>
          </nav>
        </div>
      </header>
  );
};

export default Header;
