import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

function Header({ location }) {
  const isMainPage = location?.pathname === "/";
  const isSavedArticlesPage = location?.pathname === "/saved-articles";

  return (
    <header
      className={`header ${isMainPage ? "header_main" : ""} ${
        isSavedArticlesPage ? "header_saved" : ""
      }`}
    >
      <div className="header__container">
        <Link to="/" className="header__title-link">
          <h1 className="header__title">NewsExplorer</h1>
        </Link>
        <div className="header__nav-auth">
          <Navigation location={location} />
          <button className="header__sign-in-button">Sign in</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
