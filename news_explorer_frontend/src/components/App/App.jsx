//file imports
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SavedArticles from "../SavedArticles/SavedArticles";
//library imports
import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const location = useLocation();

  return (
    <div className="page">
      <div className="page__content">
        <Header location={location} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/saved-articles" element={<SavedArticles />} />
        </Routes>
        <Footer />
      </div>

      <LoginModal
        activeModal={activeModal}
        isOpen={activeModal === "loginModal"}
      />
      <RegisterModal
        activeModal={activeModal}
        isOpen={activeModal === "registerModal"}
      />
    </div>
  );
}

export default App;
