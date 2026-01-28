import React, { useState } from 'react';
import './Header.css';
import logo from '../../assets/SpaAlita_logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className='container'>
      <header className="header">
        <div className="header-row">
          <button
            className="menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon className="menu-icon" /> : <MenuIcon className="menu-icon" />}
          </button>
          <div className="logo ">
            <img src={logo} alt="Spaalita Logo" />
          </div>
        </div>
        <nav className={menuOpen ? 'open' : ''}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/book">BookNow!</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/giftcard">GiftCard</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/specials">Monthly Specials</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/policy">Booking Policy</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/cart">Cart </a></li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
