import React from 'react';
import styles from './style/SwitchButtom.module.css';

export const SwitchButtom = ({action, value})=>{

  const handleChange=({target})=>{
    const {value} = target;
    console.log(target)
    action(value);
  }
  return( 
    <label className={styles.switch}>
      <input type="checkbox" onChange={(e)=>handleChange(e)} value={value} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
}