import "./SearchForm.css";
import { useState } from "react";
import PropTypes from "prop-types";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="search">
      <div className="search-form">
        <h2 className="search__title">What&apos;s going on in the world?</h2>
        <p className="search__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <form className="search-form__bar" onSubmit={handleSubmit}>
          <input
            className="search-form__input"
            type="text"
            placeholder="Enter topic"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <button className="search-form__button" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
