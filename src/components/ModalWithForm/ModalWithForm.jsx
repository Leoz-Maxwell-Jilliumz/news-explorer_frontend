import "./ModalWithForm.css";
import closeIcon from "../../assets/close.svg"; // Import the close icon
import PropTypes from "prop-types";

function ModalWithForm({ children, isOpen = false, onClose, title }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`} onClick={onClose}>
      <div className="modal__container">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          <form className="modal__form">
            <h2 className="modal__title">{title}</h2>
            {children}
          </form>
        </div>
      </div>
    </div>
  );
}

ModalWithForm.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default ModalWithForm;
