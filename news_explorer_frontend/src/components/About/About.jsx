import "./About.css";
import Profile from "../../assets/profile.jpg";
function About() {
  return (
    <div className="about">
      <img src={Profile} alt="Profile" className="about__img" />
      <div className="about__description">
        <h2 className="about__title">About the Author</h2>
        <p className="about__text">
          Привет! Меня зовут Виктория. Я фронтенд-разработчик. Это мой дипломный
        </p>
      </div>
    </div>
  );
}

export default About;
