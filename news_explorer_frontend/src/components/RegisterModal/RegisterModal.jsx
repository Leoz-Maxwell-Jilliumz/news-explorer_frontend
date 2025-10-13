import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose }) {
  return (
    <ModalWithForm isOpen={isOpen}>
      <label className="modal__label">
        Email
        <input type="email" className="modal__input" />
      </label>
      <label className="modal__label">
        Password
        <input type="password" className="modal__input" />
      </label>
      <label className="modal__label">
        Username
        <input type="text" className="modal__input" />
      </label>
      <div className="modal__button-container">
        <button className="modal__submit" type="submit">
          Sign Up
        </button>
        <span className="modal__button-span">
          or&nbsp;
          <a href="#">Sign in</a>
        </span>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
