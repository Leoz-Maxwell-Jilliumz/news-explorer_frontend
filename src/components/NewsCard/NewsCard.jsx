import "./NewsCard.css";
import bookmark from "../../assets/bookmark.svg";
import bookmark_blue from "../../assets/bookmark_blue.svg";
import delete_icon from "../../assets/delete_icon.svg";
import { useState } from "react";
import PropTypes from "prop-types";

function NewsCard({
  title,
  description = "", // Default parameter instead of defaultProps
  url,
  imageUrl = "", // Default parameter instead of defaultProps
  source,
  publishedAt,
  isLoggedIn,
  onSaveArticle,
  isArticleSaved,
  pageContext,
  keyword: propKeyword = null, // Rename to avoid conflict
  onRemoveArticle = null, // Default parameter instead of defaultProps
  showKeywords = false, // Add default for showKeywords
}) {
  // Force re-render trigger
  const [, forceUpdate] = useState({});

  const articleData = {
    title,
    description,
    url,
    imageUrl,
    source,
    publishedAt,
  };

  const isSaved = isArticleSaved ? isArticleSaved(url) : false;

  const handleBookmarkClick = () => {
    if (isLoggedIn && onSaveArticle) {
      onSaveArticle(articleData);

      // Force component to re-render after a short delay to allow state to update
      setTimeout(() => {
        forceUpdate({});
      }, 100);
    } else {
      console.log("Cannot save - not logged in or no save function");
    }
  };

  // Different icons based on context and saved state
  const getBookmarkIcon = () => {
    if (pageContext === "saved") {
      return delete_icon; // Use a delete/remove icon for saved articles page
    }
    return isSaved ? bookmark_blue : bookmark; // Use bookmark icons for main page
  };

  const getTooltipText = () => {
    if (pageContext === "saved") {
      return "Remove from saved";
    }
    return "Sign in to save articles";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  };

  // Extract keywords function - simplified for just 1 keyword
  const extractKeywords = () => {
    if (title) {
      const firstKeyword = title
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter((word) => word.length > 3)[0];

      if (firstKeyword) {
        return firstKeyword.charAt(0).toUpperCase() + firstKeyword.slice(1);
      }
    }

    if (source) {
      return source.toLowerCase();
    }

    return null;
  };

  // Use propKeyword if provided, otherwise extract from title/source
  const displayKeyword = propKeyword || extractKeywords();

  return (
    <li className="news-card">
      <div className="news-card__image-container">
        <img src={imageUrl} alt={title} className="news-card__image" />

        {/* Bookmark container */}
        <div className="bookmark__container">
          <button
            className={`bookmark-icon ${!isLoggedIn ? "not-logged-in" : ""} ${
              isSaved ? "saved" : ""
            } ${pageContext === "saved" ? "remove-mode" : ""}`}
            onClick={handleBookmarkClick}
            disabled={!isLoggedIn}
            data-tooltip={getTooltipText()}
          >
            <img
              src={getBookmarkIcon()}
              alt={pageContext === "saved" ? "remove" : "bookmark"}
              className="bookmark__image"
            />
          </button>
        </div>

        {/* Keyword tag container - positioned like bookmark */}
        {showKeywords && displayKeyword && pageContext === "saved" && (
          <div className="keyword__container">
            <span className="keyword-tag">{displayKeyword}</span>
          </div>
        )}
      </div>

      <div className="news-card__content">
        <p className="news-card__date">{formatDate(publishedAt)}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{description}</p>
        <p className="news-card__source">{source}</p>
      </div>
    </li>
  );
}

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  source: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onSaveArticle: PropTypes.func.isRequired,
  isArticleSaved: PropTypes.func.isRequired,
  pageContext: PropTypes.oneOf(["main", "saved"]).isRequired,
  keyword: PropTypes.string,
  onRemoveArticle: PropTypes.func,
  showKeywords: PropTypes.bool,
};

export default NewsCard;
