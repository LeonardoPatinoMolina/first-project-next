"use client"
import {useState} from "react";
import styles from "../styles/Footer.module.css";
import {SiGmail} from 'react-icons/si'
import {BsGithub, BsLinkedin} from 'react-icons/bs'


export default function Footer() {
  const [copied, setCopied] = useState();

  const handleClickGmail= ({target})=>{
    setCopied(true)
    navigator.clipboard.writeText(target.innerText)
      .then(()=>{
        setTimeout(()=>{
          setCopied(false);
        },[800]);
      })
      .catch((err)=>console.log(err));
  };

  return (
    <footer className={styles.footer}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={`${styles.modal} ${styles.bounce_a} ${copied && styles.copied}`}>¡Copiado!</div>
          <span title="Copiar" onClick={(e)=>handleClickGmail(e)}><SiGmail size={25} className={styles.icon} />
            leonardopatino99@gmail.com
          </span>
          </li>
        <li className={styles.item}>
          <a href="https://github.com/LeoCHAD" target="_blank" rel="noopener noreferrer">
          <BsGithub size={25} className={styles.icon} />leoCHAD
          </a>
        </li>
        <li className={styles.item}>
          <a href="https://www.linkedin.com/in/leonardo-fabio-pati%C3%B1o-molina-98802a213" target="_blank" rel="noopener noreferrer">
          <BsLinkedin size={25} className={styles.icon} />Leonardo Fabio Patiño Molina
          </a>
        </li>
      </ul>
    </footer>
  );
}
