import "./NewsCard.css";
import bookmark from "../../assets/bookmark.svg";

function NewsCard({ title, description, imageUrl, source, publishedAt }) {
  return (
    <div className="news-card">
      <div className="news-card__image">
        <img src={imageUrl} alt={title} className="news-card__img" />
        <button className="news-card__button">
          <img src={bookmark} alt="" className="bookmark__image" />
        </button>
      </div>

      <div className="news-card__content">
        <p className="news-card__date">{publishedAt}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{description}</p>
        <p className="news-card__source">{source}</p>
      </div>
    </div>
  );
}

export default NewsCard;
