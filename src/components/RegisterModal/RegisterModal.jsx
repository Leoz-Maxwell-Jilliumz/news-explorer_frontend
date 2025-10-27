import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import PropTypes from "prop-types";

function RegisterModal({ isOpen, onClose, onModalSwitch }) {
  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose} title="Sign up">
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
      <label className="modal__label">
        Username
        <input
          type="text"
          className="modal__input"
          required
          placeholder="Enter Username"
        />
      </label>
      <div className="modal__button-container">
        <button className="modal__submit" type="submit">
          Sign Up
        </button>
        <span className="modal__button-span">
          or&nbsp;
          <a
            href="/"
            className="modal__button-link"
            onClick={(e) => {
              e.preventDefault();
              onModalSwitch("loginModal");
            }}
          >
            Sign in
          </a>
        </span>
      </div>
    </ModalWithForm>
  );
}

RegisterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onModalSwitch: PropTypes.func.isRequired,
};

export default RegisterModal;
