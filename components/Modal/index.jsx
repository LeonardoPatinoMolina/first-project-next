import { Logo } from "../../components/Logo";
import styles from './style/Modal.module.css';

export const Modal = ({ title = false, children, loot }) => {
  return (
    <div className={`${styles.modal} ${loot.openStatus && styles.modal__is_open}`}>
      <div className={`${styles.modal__container} ${styles.bounce_a}`}>
        {title && (<h3 className={`${styles.modal__title}`}>{title}</h3>)}
        <div className={`${styles.modal__icon} ${loot.animateStatus && styles.animate}`}>
        <Logo size={80} color={loot.color} />
        </div>
        <p className={styles.modal__message}>{children}</p>
      </div>
    </div>
  );
}