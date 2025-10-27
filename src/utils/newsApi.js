import { ApiKey } from "./constants";

const API_KEY = ApiKey;
const BASE_URL =
  import.meta.env.PROD === "production"
    ? "https://nomoreparties.co/news/v2"
    : "https://newsapi.org/v2";

// Function to fetch articles based on a search query
export const fetchArticles = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.articles; // Return the articles from the response
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

// Function to fetch top headlines
export const fetchTopHeadlines = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.articles; // Return the articles from the response
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};
