import { useEffect } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import logoutIcon from "../../assets/logout.svg";
import darkLogoutIcon from "../../assets/logout-dark.svg";
import menuIcon from "../../assets/menu.svg";
import closeIcon from "../../assets/close.svg";
import PropTypes from "prop-types";

function Navigation({
  location,
  handleLoginClick,
  isLoggedIn,
  handleLogout,
  userData,
  isAnyModalOpen,
  onCloseModal,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const handleMenuClick = () => {
    if (isAnyModalOpen) {
      onCloseModal();
    } else {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when modals open
  useEffect(() => {
    if (isAnyModalOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isAnyModalOpen, setIsMobileMenuOpen]);

  // Build nav classes
  const navClass = (() => {
    let classes = location.pathname === "/saved-articles" ? "nav_saved" : "nav";
    if (isMobileMenuOpen) {
      classes += " mobile-menu-open";
    }
    return classes;
  })();

  // Determine which icon to show
  const getMenuIcon = () => {
    if (isAnyModalOpen) {
      return closeIcon; // Show close icon when modal is open
    }
    return isMobileMenuOpen ? closeIcon : menuIcon;
  };

  const getLogoutIcon = () => {
    return location.pathname === "/saved-articles"
      ? darkLogoutIcon
      : logoutIcon;
  };
  return (
    <nav className={navClass}>
      {/* Menu button */}
      <button
        className="nav__menu"
        onClick={handleMenuClick}
        aria-label="Toggle menu"
      >
        <img
          src={getMenuIcon()}
          alt={isAnyModalOpen ? "Close" : isMobileMenuOpen ? "Close" : "Menu"}
          className="nav__menu-icon"
        />
      </button>
      {/* Mobile dropdown menu */}
      <div
        className={`nav__mobile-dropdown ${
          isMobileMenuOpen ? "nav__mobile-dropdown_open" : ""
        }`}
      >
        <div className="nav__mobile-container">
          {/* Navigation links inside dropdown */}
          <ul className="nav__mobile-links">
            <li>
              <Link
                to="/"
                className="nav__mobile-home"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link
                  to="/saved-articles"
                  className="nav__mobile-saved-articles"
                  onClick={closeMobileMenu}
                >
                  Saved articles
                </Link>
              </li>
            )}
            <li>
              {isLoggedIn ? (
                <button
                  className="nav__mobile-logout-button"
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                >
                  <span className="nav__mobile-username">
                    {userData?.username || "User"}
                  </span>
                  <img
                    src={getLogoutIcon()}
                    alt="Logout"
                    className="nav__mobile-logout-img"
                  />
                </button>
              ) : (
                <button
                  className="nav__mobile-sign-in-button"
                  onClick={() => {
                    handleLoginClick();
                    closeMobileMenu();
                  }}
                >
                  Sign in
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* Desktop navigation links - hidden on mobile */}
      <ul className="nav__page-links">
        <li>
          <Link to="/" className="nav__home">
            Home
          </Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/saved-articles" className="nav__saved-articles">
              Saved articles
            </Link>
          </li>
        )}
        <li>
          {isLoggedIn ? (
            <button className="nav__logout-button" onClick={handleLogout}>
              <span className="nav__username">
                {userData?.username || "User"}
              </span>
              <img
                src={getLogoutIcon()}
                alt="Logout"
                className="nav__logout-img"
              />
            </button>
          ) : (
            <button className="nav__sign-in-button" onClick={handleLoginClick}>
              Sign in
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  location: PropTypes.object.isRequired,
  handleLoginClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
  }),
  isAnyModalOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  isMobileMenuOpen: PropTypes.bool.isRequired,
  setIsMobileMenuOpen: PropTypes.func.isRequired,
};

export default Navigation;
