import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import PropTypes from "prop-types";

function LoginModal({ isOpen, onClose, onModalSwitch }) {
  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose} title="Sign in">
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          required
          placeholder="Enter Email"
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          required
          placeholder="Enter Password"
        />
      </label>

      <div className="modal__button-container">
        <button className="modal__submit" type="submit">
          Sign In
        </button>
        <span className="modal__button-span">
          or&nbsp;
          <a
            href="/"
            className="modal__button-link"
            onClick={(e) => {
              e.preventDefault();
              onModalSwitch("registerModal");
            }}
          >
            Sign up
          </a>
        </span>
      </div>
    </ModalWithForm>
  );
}

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onModalSwitch: PropTypes.func.isRequired,
};

export default LoginModal;
