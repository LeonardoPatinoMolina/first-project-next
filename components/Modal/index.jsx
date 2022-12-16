import { Logo } from "../../components/Logo";
import styles from './style/Modal.module.css';

export const Modal = ({ title = false, children, isOpen, isError=false }) => {

  return (
    <div className={`${styles.modal} ${isOpen && styles.modal__is_open}`}>
      <div className={`${styles.modal__container}`}>
        {title && (<h3 className={`${styles.modal__title}`}>{title}</h3>)}
        <div className={`${styles.modal__icon} ${!isError && styles.animate}`}>
        <Logo size={80} color={isError ? '#ff0000' : '#777777'} />
        </div>
        <p className={styles.modal__message} >{children}</p>
        
      {/* <button
      className="boton"
      onClick={() => closeModal()}
      >ACEPTAR</button> */}
      </div>
    </div>
  );
}