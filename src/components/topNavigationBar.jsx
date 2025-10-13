import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../App';

const NAV_LINKS = [
  { to: '/feed', label: 'Feed' },
  { to: '/chat', label: 'Chat' },
  { to: '/mint', label: 'Mint' },
  { to: '/store', label: 'Store' }
];

const TopNavigationBar = () => {
  const { user, logout, tokenBalance } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const firstLinkRef = useRef(null);
  const dropdownRef = useRef(null);
  const userButtonRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
    if (dropdownOpen) setDropdownOpen(false);
  };
  const closeMenu = () => setMenuOpen(false);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
    if (menuOpen) setMenuOpen(false);
  };
  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        if (menuOpen) closeMenu();
        if (dropdownOpen) closeDropdown();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, dropdownOpen]);

  useEffect(() => {
    if (menuOpen) {
      firstLinkRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = e => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target)
      ) {
        closeMenu();
      }
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(e.target)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen, dropdownOpen]);

  return (
    <nav className="top-nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          FACECROOK
        </Link>
        <button
          ref={toggleButtonRef}
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
        >
          <span className="hamburger" />
        </button>
        <div
          id="primary-navigation"
          ref={menuRef}
          className={`nav-menu ${menuOpen ? 'active' : ''}`}
          role="menu"
          aria-hidden={!menuOpen}
        >
          {NAV_LINKS.map((link, idx) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={closeMenu}
              role="menuitem"
              tabIndex={menuOpen ? 0 : -1}
              ref={idx === 0 ? firstLinkRef : null}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="nav-user">
          {user ? (
            <>
              <span className="nav-balance">{tokenBalance} CROOK</span>
              <div className="user-dropdown" ref={dropdownRef}>
                <button
                  ref={userButtonRef}
                  className="user-button"
                  onClick={toggleDropdown}
                  aria-haspopup="true"
                  aria-controls="user-menu"
                  aria-expanded={dropdownOpen}
                >
                  {user.name}
                </button>
                {dropdownOpen && (
                  <div
                    id="user-menu"
                    className="dropdown-menu"
                    role="menu"
                    aria-labelledby={userButtonRef.current?.id}
                  >
                    <Link
                      to="/profile"
                      onClick={() => {
                        closeDropdown();
                        closeMenu();
                      }}
                      role="menuitem"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        closeMenu();
                        closeDropdown();
                      }}
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login" className="nav-login" onClick={closeMenu}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavigationBar;