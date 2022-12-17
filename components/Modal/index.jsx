import { Logo } from "../../components/Logo";
import styles from './style/Modal.module.css';

export const Modal = ({ title = false, children, isOpen, isError=false, isSuccess=false }) => {
  const colorReducer = ()=>{
    if(isError) return '#ff0000';
    if(isSuccess) return '#12fd14'
    else return '#777777'
  }
  return (
    <div className={`${styles.modal} ${isOpen && styles.modal__is_open}`}>
      <div className={`${styles.modal__container}`}>
        {title && (<h3 className={`${styles.modal__title}`}>{title}</h3>)}
        <div className={`${styles.modal__icon} ${!isError && styles.animate}`}>
        <Logo size={80} color={colorReducer()} />
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