import "./SavedArticles.css";
import NewsCard from "../NewsCard/NewsCard";
import PropTypes from "prop-types";

function SavedArticles({ savedArticles, onSaveArticle, isLoggedIn, userData }) {
  const isArticleSaved = (articleUrl) => {
    return savedArticles.some((saved) => saved.url === articleUrl);
  };

  // Extract keywords from all saved articles
  const getAllKeywords = () => {
    const allKeywords = [];

    savedArticles.forEach((article) => {
      if (article.title) {
        const firstKeyword = article.title
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .split(/\s+/)
          .filter((word) => word.length > 3)[0];

        if (firstKeyword) {
          const capitalizedKeyword =
            firstKeyword.charAt(0).toUpperCase() + firstKeyword.slice(1);
          allKeywords.push(capitalizedKeyword);
        }
      } else if (article.source) {
        const capitalizedSource =
          article.source.charAt(0).toUpperCase() +
          article.source.slice(1).toLowerCase();
        allKeywords.push(capitalizedSource);
      }
    });

    // Remove duplicates
    return [...new Set(allKeywords)];
  };

  // Format keywords display text
  const getKeywordsText = () => {
    const keywords = getAllKeywords();

    if (keywords.length === 0) {
      return null;
    }

    let keywordsString = "";

    if (keywords.length === 1) {
      keywordsString = keywords[0];
    } else if (keywords.length === 2) {
      keywordsString = `${keywords[0]} and ${keywords[1]}`;
    } else if (keywords.length <= 4) {
      const lastKeyword = keywords[keywords.length - 1];
      const firstKeywords = keywords.slice(0, -1).join(", ");
      keywordsString = `${firstKeywords}, and ${lastKeyword}`;
    } else {
      // More than 4 keywords
      const visibleKeywords = keywords.slice(0, 2);
      const remainingCount = keywords.length - 2;
      keywordsString = `${visibleKeywords.join(
        ", "
      )}, and ${remainingCount} other${remainingCount > 1 ? "s" : ""}`;
    }

    return keywordsString;
  };

  const keywordsString = getKeywordsText();

  return (
    <main className="saved-articles">
      <section className="saved-articles__header">
        <h1 className="saved-articles__title">Saved Articles</h1>
        <p className="saved-articles__subtitle">
          {savedArticles.length > 0
            ? `${userData.username}, you have ${
                savedArticles.length
              } saved article${savedArticles.length === 1 ? "" : "s"}`
            : `${userData?.username || "User"}, you have no saved articles yet`}
        </p>

        {/* Display keywords summary */}
        {keywordsString && (
          <p className="saved-articles__keyword">
            By keywords:{" "}
            <span className="saved-articles__keyword-highlight">
              {keywordsString}
            </span>
          </p>
        )}
      </section>

      {savedArticles.length > 0 ? (
        <section className="saved-articles__results">
          <ul className="saved-articles__list">
            {savedArticles.map((article) => (
              <NewsCard
                key={article.url}
                title={article.title}
                description={article.description}
                url={article.url}
                imageUrl={article.imageUrl}
                source={article.source}
                publishedAt={article.publishedAt}
                isLoggedIn={isLoggedIn}
                onSaveArticle={onSaveArticle}
                isArticleSaved={isArticleSaved}
                showKeywords={true}
                pageContext="saved"
              />
            ))}
          </ul>
        </section>
      ) : (
        <section className="saved-articles__empty">
          <p className="saved-articles__empty-text">
            No saved articles yet. Go to the home page and save some articles!
          </p>
        </section>
      )}
    </main>
  );
}

export default SavedArticles;

SavedArticles.propTypes = {
  savedArticles: PropTypes.array.isRequired,
  onSaveArticle: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
  }),
};
