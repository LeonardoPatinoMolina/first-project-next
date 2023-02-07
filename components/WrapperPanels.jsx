import React, { useState, useEffect } from "react";
import styles from "../styles/WrapperPanels.module.css";

export const WrapperPanels = ({ children, isMyHeros = false }) => {

  const reducerSizeWrapper = ()=>{
    if(children){
      if(children.length <= 2)return styles.wrapper_min;
      if(children.length <= 4)return styles.wrapper_mid;
      else return styles.wrapper_max;
    }else return styles.content_heros_empty;

  };
  return (
    <section
      className={`${styles.wrapper} ${reducerSizeWrapper()}`}
    >
          {!children && (<div className={`${styles.empty_result}`}>
            NO HAY RESULTADOS PARA MOSTRAR
          </div>)}
      {children}
    </section>
  );
};
