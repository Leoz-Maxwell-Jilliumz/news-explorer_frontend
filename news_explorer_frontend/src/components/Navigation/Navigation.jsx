import "./Navigation.css";

function Navigation({ location }) {
  const isMainPage = location?.pathname === "/";
  const isSavedArticlesPage = location?.pathname === "/saved-articles";

  return (
    <nav
      className={`nav ${isMainPage ? "nav_main" : ""} ${
        isSavedArticlesPage ? "nav_saved" : ""
      }`}
    >
      <h2 className="nav__home">Home</h2>
    </nav>
  );
}

export default Navigation;
