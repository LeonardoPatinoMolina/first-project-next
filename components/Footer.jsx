"use client"
import React from "react";
import styles from "../styles/Footer.module.css";
import {Logo} from './Logo'
import {SiGmail} from 'react-icons/si'
import {BsGithub, BsFillPersonFill} from 'react-icons/bs'

export default function Footer() {
  const colorIcons = '#fff5'
  return (
    <footer className={styles.footer}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <BsFillPersonFill size={25} className={styles.icon} />Leonardo Fabio Patiño Molina
          </li>
        <li className={styles.item}><SiGmail size={25} className={styles.icon} />leonardopatino99@gmail.com</li>
        <li className={styles.item}>
          <a href="https://github.com/LeoCHAD" target="_blank" rel="noopener noreferrer">
          <BsGithub size={25} className={styles.icon} />leoCHAD
          </a>
          </li>
      </ul>
    </footer>
  );
}
