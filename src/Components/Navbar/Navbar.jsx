import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Urban Fashion</Link>
      </div>
      
      <div className="nav-categories">
        <Link to="/mens" className={path === '/mens' ? 'active' : ''}>
          Men's
        </Link>
        <Link to="/womens" className={path === '/womens' ? 'active' : ''}>
          Women's
        </Link>
      </div>

      <div className="nav-right">
        <div className="cart-icon">
          <Link to="/cart" className={path === '/cart' ? 'active' : ''}>
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">0</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
