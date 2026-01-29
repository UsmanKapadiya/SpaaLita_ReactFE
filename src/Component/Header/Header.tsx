import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
            <li><Link to="/">Home</Link></li>
            <li><Link to="/book">Book NOW!</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/giftcard">Gift Card</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/specials">Monthly Specials</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/policy">Booking Policy</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
