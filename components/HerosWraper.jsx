import React from "react";
import styles from "../Styles/ContentHeros.module.css";
// import { useSelector } from "react-redux";

const { content_heros, back_whait } = styles;

export const HerosWraper = ({ children }) => {
  // const { character } = useSelector((state) => state.characters);
  // const { favorites } = useSelector((state) => state.favorites);
  // const { myheros } = useSelector((state) => state.myheros);

  // const checkStatusEmpty = () => {
  //   switch (children.props.type) {
  //     case "characters":
  //       if (character.length < 1) return back_whait;
  //       break;
  //     case "favorites":
  //       if (favorites.length < 1) {
  //         return back_whait;
  //       }
  //       break;
  //     default:
  //       if (myheros.length < 1) {
  //         return back_whait;
  //       }
  //       return "";
  //   }
  // };
  return (
    // <section className={`${content_heros} ${checkStatusEmpty()}`}>
    <section className={`${content_heros}`}>
      {children}
    </section>
  );
};
