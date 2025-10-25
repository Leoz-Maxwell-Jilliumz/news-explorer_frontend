import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import PropTypes from "prop-types";

function Header({
  location,
  handleLoginClick,
  handleLogout,
  isLoggedIn,
  userData,
  isAnyModalOpen,
  onCloseModal,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const headerClass =
    location.pathname === "/saved-articles" ? "header_saved" : "header_main";

  const getHeaderClasses = () => {
    let classes = headerClass;
    if (isMobileMenuOpen && !isAnyModalOpen) {
      classes += " mobile-menu-open";
    }
    return classes;
  };

  return (
    <header className={getHeaderClasses()}>
      <div className="header__container">
        <Link to="/" className="header__title-link">
          <h1 className="header__title">NewsExplorer</h1>
        </Link>
        <div className="header__nav-auth">
          <Navigation
            location={location}
            handleLoginClick={handleLoginClick}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            userData={userData}
            isAnyModalOpen={isAnyModalOpen}
            onCloseModal={onCloseModal}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
  handleLoginClick: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
  }),
  isAnyModalOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Header;
