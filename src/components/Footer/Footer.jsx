import "./Footer.css";
import githubIcon from "../../assets/github.svg";
import linkedinIcon from "../../assets/linkedin.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © 2025 Supersite, Powered by News API
        </p>
        <div className="footer__links">
          <ul className="footer__links-text">
            <li>
              <a className="footer__link" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="footer__link" href="#">
                Triple Ten
              </a>
            </li>
          </ul>
          <ul className="footer__links-icons">
            <li>
              <a
                className="footer__link"
                href="https://github.com/Leoz-Maxwell-Jilliumz"
              >
                <img
                  className="footer__icon-git"
                  src={githubIcon}
                  alt="GitHub"
                />
              </a>
            </li>
            <li>
              <a
                className="footer__link"
                href="https://www.linkedin.com/in/jamin-workman-8505312b1"
              >
                <img
                  className="footer__icon-linkedin"
                  src={linkedinIcon}
                  alt="LinkedIn"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
