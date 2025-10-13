import "./SavedArticles.css";
import NewsCard from "../NewsCard/NewsCard";

function SavedArticles() {
  const demoArticles = [
    {
      id: 1,
      title:
        "Climate Change Summit Reaches Historic Agreement on Carbon Emissions",
      description:
        "World leaders from 195 countries have reached a groundbreaking agreement to reduce global carbon emissions by 50% within the next decade. The summit, held in Geneva, marks a turning point in international climate policy.",
      url: "https://example.com/climate-summit",
      imageUrl:
        "https://images.unsplash.com/photo-1569163139394-de44cb5ce2a8?w=400&h=200&fit=crop",
      source: "Global News Network",
      publishedAt: "2025-10-10",
    },
    {
      id: 2,
      title: "Revolutionary AI Technology Breakthrough in Medical Diagnostics",
      description:
        "Scientists at MIT have developed an AI system that can detect early-stage cancer with 99.2% accuracy. This breakthrough could revolutionize medical diagnostics and save millions of lives worldwide.",
      url: "https://example.com/ai-medical-breakthrough",
      imageUrl:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
      source: "Tech Today",
      publishedAt: "2025-10-09",
    },
    {
      id: 3,
      title:
        "Space Exploration Milestone: First Human Mission to Mars Approved",
      description:
        "NASA announces the approval of the first crewed mission to Mars, scheduled for 2030. The ambitious project will see a team of six astronauts journey to the Red Planet for a two-year exploration mission.",
      url: "https://example.com/mars-mission",
      imageUrl:
        "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=200&fit=crop",
      source: "Space Chronicle",
      publishedAt: "2025-10-08",
    },
  ];

  return (
    <section className="saved-articles">
      <div className="saved__title">
        <h2 className="saved-articles__title">Saved Articles</h2>
        <p className="saved-articles__subtitle">You have 3 saved articles</p>
        <p className="saved-articles__keyword">
          By Keyword:
          <span className="saved-articles__keyword-highlight">Technology</span>
        </p>
      </div>
      <div className="saved-articles__list-container">
        <ul className="saved-articles__list">
          {demoArticles.map((article) => (
            <NewsCard
              key={article.id}
              title={article.title}
              description={article.description}
              url={article.url}
              imageUrl={article.imageUrl}
              source={article.source}
              publishedAt={article.publishedAt}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
export default SavedArticles;
