import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaPaintBrush } from "react-icons/fa";
import styles from "../Styles/PanelMyHero.module.css";

export const PanelMyHero = ({ id, name, img, area }) => {
  const router = useRouter();
  const [isOver, setIsOver] = useState(false);
  const image_wraper = useRef();
  useEffect(() => {
    const exp1 = /width="300"/g;
    const exp2 = /height="300"/g;
    const exp3 = /\(\-\|\-\)/g;
    const imgR1 = img.replace(exp1, 'width="100%"');
    const imgR2 = imgR1.replace(exp2, 'height="100%"  (-|-)');
    const imgR3 = imgR2.replace(exp3, 'viewBox="0 0 300 300"');

    image_wraper.current.innerHTML = imgR3;
  }, [img]);
  const open = () => {
    router.push(`/myhero/${id}`);
  };
  const handleOver = () => setIsOver(true);
  const handleOut = () => setIsOver(false);

  return (
    <article
      key={id}
      className={styles.panel}
      onClick={open}
      onMouseOver={() => handleOver()}
      onMouseOut={() => handleOut()}
      onTouchStart={()=> handleOver()}
      onTouchEnd={()=> handleOut()}
    >
      {isOver && (
        <div className={styles.data_wrapper}>
          <h3 className={styles.name_style}>{name}</h3>
          <FaPaintBrush size={35} className={styles.icon} />
        </div>
      )}
      <div
        ref={image_wraper}
        className={`${styles.image} ${isOver && styles.dark_img}`}
      ></div>
    </article>
  );
};
