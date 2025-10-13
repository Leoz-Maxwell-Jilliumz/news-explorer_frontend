import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose }) {
  return (
    <ModalWithForm isOpen={isOpen}>
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
          <a href="#">Sign up</a>
        </span>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
