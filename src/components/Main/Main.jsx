import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import NewsCard from "../NewsCard/NewsCard";
import About from "../About/About";
import Preloader from "../Preloader/Preloader";
import SadFaceIcon from "../../assets/SadFaceIcon.svg";
import { useState } from "react";
import { fetchArticles } from "../../utils/newsApi";
import PropTypes from "prop-types";

function Main({
  isArticleSaved,
  isLoggedIn,
  onSaveArticle,
  // Remove these unused props
}) {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  // Remove error and query since you're not using them in the UI
  const [visibleCount, setVisibleCount] = useState(3);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    setHasSearched(true);

    try {
      const fetchedArticles = await fetchArticles(searchQuery);
      setTimeout(() => {
        setSearchResults(fetchedArticles);
        setVisibleCount(3); // Reset to 3 on new search
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]);
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const shouldShowLoadMore = visibleCount < searchResults.length;

  return (
    <main className="main">
      <section className="search">
        <SearchForm onSearch={handleSearch} />
      </section>
      {hasSearched && loading && (
        <section className="search-results">
          <Preloader />
        </section>
      )}
      {hasSearched && !loading && searchResults.length > 0 && (
        <section className="search-results">
          <h2 className="search-results__title">Search Results</h2>
          <ul className="search-results__list">
            {searchResults.slice(0, visibleCount).map((article) => (
              <NewsCard
                key={article.url}
                title={article.title}
                description={article.description}
                url={article.url}
                imageUrl={article.urlToImage}
                source={article.source.name}
                publishedAt={article.publishedAt}
                isLoggedIn={isLoggedIn}
                onSaveArticle={onSaveArticle}
                isArticleSaved={isArticleSaved}
                pageContext="main"
              />
            ))}
          </ul>
          {shouldShowLoadMore && (
            <button className="load-more-button" onClick={handleLoadMore}>
              Show More Articles
            </button>
          )}
        </section>
      )}
      {hasSearched && !loading && searchResults.length === 0 && (
        <section className="search-results">
          <div className="nothing-found">
            <img
              src={SadFaceIcon}
              alt="Nothing found"
              className="nothing-found__icon"
            />
            <h3 className="nothing-found__title">Nothing found</h3>
            <p className="nothing-found__text">
              Sorry, but nothing matched your search terms.
            </p>
          </div>
        </section>
      )}
      <section className="about">
        <About />
      </section>
    </main>
  );
}

Main.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onSaveArticle: PropTypes.func.isRequired,
  isArticleSaved: PropTypes.func.isRequired,
};

export default Main;
