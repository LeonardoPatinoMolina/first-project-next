import React from "react";
import {useOutsideClick} from '../Hooks/useOutsideClick';
import styles from '../styles/ModalWarningText.module.css'

export const ModalWarningText = ({
  type = "user",
  setFormatError,
}) => {

  const [reference]= useOutsideClick(hideModal);

  function hideModal(){
    setFormatError((state) => {return {...state, [type]: true}})
  };

  const TEXT = {
    user: `El nombre de usuario no debe contener espacios ni caracteres especiales,
    minimo 8 caracteres, máximo 12.`,
    pass: `La contraseña debe contener al menos un
    dígito y una mayuscula, evite el uso de caracteres especiales, mínimo 8
    caracteres, máximo 12.`,
    passConfirm: `La contraseña debe contener al menos un
    dígito y una mayuscula, evite el uso de caracteres especiales, mínimo 8
    caracteres, máximo 12.`
  }

  return (
    <span ref={reference} className={`${styles.warning} ${styles.bounce_a}`}>
       {TEXT[type]}
    </span>
  );
};
