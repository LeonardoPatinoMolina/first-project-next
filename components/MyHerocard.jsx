import React, { useRef, useEffect } from "react";
import styles from "../Styles/HeroCard.module.css";
import { useRouter } from "next/router";
// import Image from "next/image";

export const MyHerocard = ({ id, name, img, area }) => {
  const router = useRouter();
  const image_wraper = useRef()
  useEffect(() => {
    const exp1 = /width="300"/g;
    const exp2 = /height="300"/g;
    const exp3 = /\(\-\|\-\)/g;
    const imgR1 = img.replace(exp1, 'width="100%"');
    const imgR2 = imgR1.replace(exp2, 'height="100%"  (-|-)');
    const imgR3 = imgR2.replace(exp3, 'viewBox="0 0 300 300"');

    image_wraper.current.innerHTML = imgR3;
  }, []);
  const open = () => {
    router.push(`/myhero/${id}`);
  };

  return (
    <article key={id} className={styles.card} onClick={open}>
      <span className={`${styles.icon} material-icons`}>
        edit
      </span>
      <div ref={image_wraper} className={styles.image}></div>
      <h3 className={styles.name_style}>{name}</h3>
    </article>
  );
};
