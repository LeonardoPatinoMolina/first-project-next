import { Logo } from "../../components/Logo";
import styles from "./style/Modal.module.css";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";

export const Modal = ({
  title = false,
  children,
  loot,
  close,
  action,
}) => {
  return (
    <div
      className={`${styles.modal} ${loot.openStatus && styles.modal__is_open}`}
    >
      <section className={`${styles.modal__container} ${styles.bounce_a}`}>
        {title && <h3 className={`${styles.modal__title}`}>{title}</h3>}
        <div
          className={`${styles.modal__icon} ${
            loot.animateStatus && styles.animate
          }`}
        >
          <Logo size={80} color={loot.color} />
        </div>
        <p className={styles.modal__message}>{children}</p>
        {loot.isQuestion && <Confirm action={action} close={close} />}
      </section>
    </div>
  );
};
function Confirm(props) {
  const handleConfirm = () => {
    props.close();
    props.action();
  };
  return (
    <div className={styles.btn_area}>
      <button
        className={` boton ${styles.btn_confirm}`}
        onClick={() => handleConfirm()}
        title="confirmar"
      >
        Confirmar
        <BsCheckCircleFill size={15} />
      </button>
      <button
        className={` boton ${styles.btn_cancel}`}
        onClick={() => props.close()}
        title="cancelar"
      >
        Cancelar
        <IoMdCloseCircle size={15} />
      </button>
    </div>
  );
}
