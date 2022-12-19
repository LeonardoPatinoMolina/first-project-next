import { Logo } from "../../components/Logo";
import styles from './style/Modal.module.css';

export const Modal = ({ title = false, children, loot }) => {
  const colorReducer = ()=>{
    if(loot.type ==='error') return '#ff0000';
    if(loot.type ==='success') return '#12fd14'
    if(loot.type ==='warning') return '#ffd000'
    else return '#777777'
  }
  return (
    <div className={`${styles.modal} ${loot.openStatus && styles.modal__is_open}`}>
      <div className={`${styles.modal__container}`}>
        {title && (<h3 className={`${styles.modal__title}`}>{title}</h3>)}
        <div className={`${styles.modal__icon} ${loot.type !== 'error' && styles.animate}`}>
        <Logo size={80} color={colorReducer()} />
        </div>
        <p className={styles.modal__message} >{children}</p>
      </div>
    </div>
  );
}