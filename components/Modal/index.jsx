import styles from './style/Modal.module.css';

export const Modal = ({ title, children, isOpen }) => {
//   <button
//   className="boton"
//   onClick={() => closeModal()}
// >ACEPTAR</button>

  return (
    <div className={`${styles.modal} ${isOpen && styles.modal__is_open}`}>
      <div className={`${styles.modal__container}`}>
        <h3 className={`${styles.modal__title}`}>
          <span className={`material-icons ${styles.modal_icon}`}>
            info
          </span> 
          {title}</h3>
        <p className={`${styles.modal__message}`}>{children}</p>
      </div>
    </div>
  );
}