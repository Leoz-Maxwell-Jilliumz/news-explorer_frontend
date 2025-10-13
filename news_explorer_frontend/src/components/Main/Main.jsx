import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import NewsCard from "../NewsCard/NewsCard";
import About from "../About/About";
import { useState } from "react";
import { fetchArticles } from "../../utils/newsApi";

function Main() {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(3); // State to manage the number of visible articles

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    setError(null);
    setQuery(searchQuery);
    setHasSearched(true);

    try {
      const fetchedArticles = await fetchArticles(searchQuery);
      setSearchResults(fetchedArticles);
      setVisibleCount(3); // Reset visible count when a new search is performed
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching articles: {error.message}</div>;

  return (
    <main className="main">
      <section className="search">
        <SearchForm onSearch={handleSearch} />
      </section>
      {hasSearched && searchResults.length > 0 && (
        <section className="search-results">
          <h2 className="search-results__title">Search Results</h2>
          <ul className="search-results__list">
            {searchResults.slice(0, visibleCount).map(
              (
                article // Limit to visibleCount
              ) => (
                <NewsCard
                  key={article.url}
                  title={article.title}
                  description={article.description}
                  url={article.url}
                  imageUrl={article.urlToImage}
                  source={article.source.name}
                  publishedAt={article.publishedAt}
                />
              )
            )}
          </ul>

          <button className="load-more-button">Show More Articles</button>
        </section>
      )}
      <section className="about">
        <About />
      </section>
    </main>
  );
}

export default Main;
