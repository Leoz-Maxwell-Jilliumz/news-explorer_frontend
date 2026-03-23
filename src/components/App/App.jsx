//file imports
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import SavedArticles from "../SavedArticles/SavedArticles.jsx";
//library imports
import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Store complete user data including username
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("userData");
    return saved ? JSON.parse(saved) : { username: "", email: "" };
  });

  // Initialize savedArticles from localStorage
  const [savedArticles, setSavedArticles] = useState(() => {
    const saved = localStorage.getItem("savedArticles");

    return saved ? JSON.parse(saved) : [];
  });

  const location = useLocation();

  // Save userData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  // Save to localStorage whenever savedArticles changes
  useEffect(() => {
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
  }, [savedArticles]);

  // Function to handle successful login
  const handleLoginSuccess = (user) => {
    setUserData({
      username: user.username, // Changed from firstName to username
      email: user.email,
      // Add other user properties as needed
    });
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  // Function to handle successful registration
  const handleRegisterSuccess = (user) => {
    setUserData({
      username: user.username, // Changed from firstName to username
      email: user.email,
    });
    setIsLoggedIn(true);
    setIsRegisterModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({ username: "", email: "" }); // Clear user data with username
    setSavedArticles([]); // Clear saved articles on logout
    localStorage.removeItem("savedArticles");
    localStorage.removeItem("userData");
  };

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  const switchModal = (modalName) => {
    if (modalName === "loginModal") {
      setIsLoginModalOpen(true);
      setIsRegisterModalOpen(false);
    } else if (modalName === "registerModal") {
      setIsLoginModalOpen(false);
      setIsRegisterModalOpen(true);
    }
  };

  // Function to save/unsave articles
  const handleSaveArticle = (article) => {
    setSavedArticles((prevSaved) => {
      const isAlreadySaved = prevSaved.some(
        (saved) => saved.url === article.url
      );

      let newSaved;
      if (isAlreadySaved) {
        newSaved = prevSaved.filter((saved) => saved.url !== article.url);
      } else {
        newSaved = [...prevSaved, article];
      }

      return newSaved;
    });
  };

  // Function to check if article is saved
  const isArticleSaved = (articleUrl) => {
    const saved = savedArticles.some((saved) => saved.url === articleUrl);
    return saved;
  };

  // Monitor savedArticles changes
  useEffect(() => {}, [savedArticles]);

  // Function to close any open modal
  const handleCloseModal = () => {
    if (isLoginModalOpen) {
      setIsLoginModalOpen(false);
    }
    if (isRegisterModalOpen) {
      setIsRegisterModalOpen(false);
    }
  };

  // Check if any modal is open
  const isAnyModalOpen = isLoginModalOpen || isRegisterModalOpen;

  return (
    <div className="page">
      <div className="page__content">
        <Header
          location={location}
          handleLoginClick={handleLogin}
          handleLogout={handleLogout}
          isLoggedIn={isLoggedIn}
          userData={userData}
          isAnyModalOpen={isAnyModalOpen} // Pass modal state
          onCloseModal={handleCloseModal} // Pass close function
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                isLoggedIn={isLoggedIn}
                onSaveArticle={handleSaveArticle}
                isArticleSaved={isArticleSaved}
                savedArticles={savedArticles}
                userData={userData} // Pass to Main if needed
              />
            }
          />
          <Route
            path="/saved-articles"
            element={
              <SavedArticles
                savedArticles={savedArticles}
                onSaveArticle={handleSaveArticle}
                isLoggedIn={isLoggedIn}
                userData={userData} // Pass to SavedArticles if needed
              />
            }
          />
        </Routes>
        <Footer />
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess} // Pass success handler
        onModalSwitch={switchModal}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegisterSuccess={handleRegisterSuccess} // Pass success handler
        onModalSwitch={switchModal}
      />
    </div>
  );
}

export default App;
