import "./ModalWithForm.css";
import closeBtn from "../../assets/close.svg";
function ModalWithForm({ isOpen = true, children }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <button type="button" className="modal__close">
        <img src={closeBtn} alt="" className="modal__btn-img" />
      </button>
      <div className="modal__content">
        <h2 className="modal__title">Sign in</h2>

        <form className="modal__form">{children}</form>
      </div>
    </div>
  );
}

export default ModalWithForm;
