import "./About.css";
import Profile from "../../assets/Jamin-Bust.jpg";
function About() {
  return (
    <div className="about">
      <img src={Profile} alt="Profile" className="about__img" />
      <div className="about__description">
        <h2 className="about__title">About the Author</h2>
        <p className="about__text">
          Hello! My name is Jamin Workman. I am a Web Developer, with expertise
          in building responsive and user-friendly web applications. I enjoy
          using React, JavaScript, and CSS to create engaging user experiences.
          In my free time, I love Golfing, Football, Spending time with friends
          and Family, and exploring new technologies.
        </p>
      </div>
    </div>
  );
}

export default About;
